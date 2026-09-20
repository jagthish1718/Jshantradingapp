import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Alert, Switch, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { STORAGE_KEYS } from '../utils/storage';
import {
  ensureStarted,
  subscribe,
  getPrice,
  optionPremium,
  optionSymbol,
  estimateWriteMargin,
  STARTING_CASH,
} from '../data/marketSim';
import type { Holding, SimState } from '../types/trading';
import { totalBlockedMargin } from '../types/trading';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';

function formatRupees(n: number) {
  return `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

// A small pill-style segmented control — used for every Buy/Sell,
// Regular/Iceberg, MIS/NRML, Market/Limit, DAY/IOC/MIN choice on this
// screen, so they all look and behave the same way.
function Segmented<T extends string>({
  options,
  value,
  onChange,
  colors,
}: {
  options: { key: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  colors: ThemeColors;
}) {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: colors.surface, borderRadius: radius.md, padding: 3, gap: 3 }}>
      {options.map((opt) => {
        const active = opt.key === value;
        return (
          <Pressable
            key={opt.key}
            onPress={() => onChange(opt.key)}
            style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: 8,
              borderRadius: radius.sm,
              backgroundColor: active ? colors.primary : 'transparent',
            }}
          >
            <Text
              style={{
                fontFamily: fonts.semiBold,
                fontSize: 12.5,
                color: active ? '#fff' : colors.textMuted,
              }}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

type Props = NativeStackScreenProps<HomeStackParamList, 'OptionOrder'>;

export default function OptionOrderScreen({ navigation, route }: Props) {
  const { underlying, strike, optType, expiry, lotSize } = route.params;
  const colors = useThemeColors();
  const styles = makeStyles(colors);

  const [, bump] = useState(0);
  useEffect(() => {
    ensureStarted();
    const unsub = subscribe(() => bump((n) => n + 1));
    return unsub;
  }, []);

  const [side, setSide] = useState<'BUY' | 'SELL'>(route.params.side ?? 'BUY');
  const [orderKind, setOrderKind] = useState<'Regular' | 'Iceberg'>('Regular');
  const [product, setProduct] = useState<'MIS' | 'NRML'>('MIS');
  const [lots, setLots] = useState(1);
  const [priceType, setPriceType] = useState<'Market' | 'Limit'>('Market');
  const [limitPrice, setLimitPrice] = useState('');
  const [useStoploss, setUseStoploss] = useState(false);
  const [triggerPrice, setTriggerPrice] = useState('');
  const [useGtt, setUseGtt] = useState(false);
  const [gttSlPct, setGttSlPct] = useState('20');
  const [gttTargetPct, setGttTargetPct] = useState('30');
  const [marketProtection, setMarketProtection] = useState(true);
  const [validity, setValidity] = useState<'DAY' | 'IOC' | 'MIN'>('DAY');
  const [validityMinutes, setValidityMinutes] = useState('5');
  const [disclosedQty, setDisclosedQty] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [cash, setCash] = useState(STARTING_CASH);
  const [existingQty, setExistingQty] = useState(0); // signed — negative means already short
  const [blockedMargin, setBlockedMargin] = useState(0);

  const symbol = useMemo(
    () => optionSymbol({ underlying, strike, type: optType, expiry, lotSize }),
    [underlying, strike, optType, expiry, lotSize]
  );

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEYS.paperTrading);
        const sim: SimState = raw ? JSON.parse(raw) : { cash: STARTING_CASH, holdings: [], orders: [] };
        setCash(typeof sim.cash === 'number' ? sim.cash : STARTING_CASH);
        const holdings: Holding[] = Array.isArray(sim.holdings) ? sim.holdings : [];
        setBlockedMargin(totalBlockedMargin(holdings));
        const existing = holdings.find((h) => h.symbol === symbol);
        setExistingQty(existing?.qty ?? 0);
      } catch {
        // ignore — falls back to defaults above
      }
    })();
  }, [symbol]);

  const spot = getPrice(underlying);
  const ltp = optionPremium(spot, strike, optType === 'CE');
  const fillBase = priceType === 'Market' ? ltp : parseFloat(limitPrice) || ltp;
  const qty = lots * lotSize;
  const availableCash = cash - blockedMargin;

  // Margin preview — mirrors placeOrder()'s math so what you see before
  // tapping is exactly what happens after.
  const closeQty = side === 'SELL' ? Math.min(qty, Math.max(0, existingQty)) : 0;
  const writeQty = side === 'SELL' ? qty - closeQty : 0;
  const writeMargin = writeQty > 0 ? estimateWriteMargin(spot, lotSize, writeQty / lotSize) : 0;
  const buyCost = side === 'BUY' ? fillBase * qty : 0;
  const marginRequired = side === 'BUY' ? buyCost : writeMargin;

  const placeOrder = async () => {
    if (priceType === 'Limit') {
      const lp = parseFloat(limitPrice);
      if (!lp || lp <= 0) {
        Alert.alert('Enter a valid limit price');
        return;
      }
      if (Math.abs(lp - ltp) / ltp > 0.1) {
        Alert.alert('Limit price too far off', `Keep it within 10% of the current LTP (${formatRupees(ltp)}).`);
        return;
      }
    }
    if (orderKind === 'Iceberg') {
      const dq = parseInt(disclosedQty, 10);
      if (!dq || dq <= 0 || dq >= qty) {
        Alert.alert('Invalid disclosed quantity', `Disclosed qty must be a positive number less than the total qty (${qty}).`);
        return;
      }
    }
    if (useStoploss) {
      const tp = parseFloat(triggerPrice);
      if (!tp || tp <= 0) {
        Alert.alert('Enter a valid stop-loss trigger price');
        return;
      }
    }
    if (useGtt) {
      const sl = parseFloat(gttSlPct);
      const tg = parseFloat(gttTargetPct);
      if (!sl || sl <= 0 || !tg || tg <= 0) {
        Alert.alert('Enter valid GTT Stop-Loss% and Target%');
        return;
      }
    }
    if (validity === 'MIN') {
      const m = parseInt(validityMinutes, 10);
      if (!m || m <= 0) {
        Alert.alert('Enter a valid number of minutes');
        return;
      }
    }

    setSubmitting(true);
    try {
      let fillPrice = priceType === 'Market' ? ltp : parseFloat(limitPrice);
      if (priceType === 'Market' && !marketProtection) {
        // Market Protection off — a real market order can slip a little
        // against you; simulate a small realistic slippage so the toggle
        // actually means something.
        const slip = fillPrice * 0.003 * Math.random();
        fillPrice = side === 'BUY' ? fillPrice + slip : Math.max(0.05, fillPrice - slip);
        fillPrice = Math.round(fillPrice * 100) / 100;
      }

      const raw = await AsyncStorage.getItem(STORAGE_KEYS.paperTrading);
      const sim: SimState = raw
        ? { cash: STARTING_CASH, holdings: [], orders: [], ...JSON.parse(raw) }
        : { cash: STARTING_CASH, holdings: [], orders: [] };
      if (!Array.isArray(sim.holdings)) sim.holdings = [];
      if (!Array.isArray(sim.orders)) sim.orders = [];

      const optionMeta = { underlying, strike, type: optType, expiry, lotSize };
      const existing = sim.holdings.find((h) => h.symbol === symbol);
      const availNow = sim.cash - totalBlockedMargin(sim.holdings);

      if (side === 'BUY') {
        const cost = fillPrice * qty;
        if (cost > availNow) {
          Alert.alert('Not enough cash', `You need ${formatRupees(cost)} but only have ${formatRupees(availNow)} available.`);
          setSubmitting(false);
          return;
        }
        if (existing && existing.qty < 0) {
          // Covering an existing short — buy back up to the full short qty.
          const origShort = -existing.qty;
          const coverQty = Math.min(qty, origShort);
          const releaseFrac = origShort > 0 ? coverQty / origShort : 0;
          const releasedMargin = (existing.marginBlocked ?? 0) * releaseFrac;
          sim.cash -= fillPrice * coverQty;
          existing.marginBlocked = Math.max(0, (existing.marginBlocked ?? 0) - releasedMargin);
          existing.qty += coverQty;
          const leftover = qty - coverQty;
          if (existing.qty === 0) {
            existing.marginBlocked = 0;
            if (leftover > 0) {
              existing.qty = leftover;
              existing.avgPrice = fillPrice;
              sim.cash -= fillPrice * leftover;
            } else {
              sim.holdings = sim.holdings.filter((h) => h.symbol !== symbol);
            }
          }
        } else if (existing) {
          const newQty = existing.qty + qty;
          existing.avgPrice = (existing.avgPrice * existing.qty + fillPrice * qty) / newQty;
          existing.qty = newQty;
          sim.cash -= cost;
        } else {
          sim.holdings.push({
            symbol,
            qty,
            avgPrice: fillPrice,
            stopLoss: null,
            target: null,
            trailingPercent: null,
            trailingHigh: null,
            option: optionMeta,
            product,
          });
          sim.cash -= cost;
        }
      } else {
        // SELL — close an existing long first, then write (short) the rest.
        if (closeQty > 0 && existing) {
          sim.cash += fillPrice * closeQty;
          existing.qty -= closeQty;
          if (existing.qty === 0 && writeQty === 0) {
            sim.holdings = sim.holdings.filter((h) => h.symbol !== symbol);
          }
        }
        if (writeQty > 0) {
          const marginNeeded = estimateWriteMargin(spot, lotSize, writeQty / lotSize);
          const availAfterClose = sim.cash + fillPrice * writeQty - totalBlockedMargin(sim.holdings);
          if (marginNeeded > availAfterClose) {
            Alert.alert(
              'Not enough margin to write this option',
              `Writing ${writeQty} qty needs about ${formatRupees(marginNeeded)} margin. Close some other positions first, or write fewer lots.`
            );
            setSubmitting(false);
            return;
          }
          sim.cash += fillPrice * writeQty; // premium received
          const stillHeld = sim.holdings.find((h) => h.symbol === symbol);
          if (stillHeld && stillHeld.qty < 0) {
            const newShort = -stillHeld.qty + writeQty;
            stillHeld.avgPrice = (stillHeld.avgPrice * -stillHeld.qty + fillPrice * writeQty) / newShort;
            stillHeld.qty = -newShort;
            stillHeld.marginBlocked = (stillHeld.marginBlocked ?? 0) + marginNeeded;
          } else if (stillHeld) {
            // Shouldn't normally happen (closeQty should have zeroed it),
            // but guard anyway.
            stillHeld.qty = -writeQty;
            stillHeld.avgPrice = fillPrice;
            stillHeld.marginBlocked = marginNeeded;
          } else {
            sim.holdings.push({
              symbol,
              qty: -writeQty,
              avgPrice: fillPrice,
              stopLoss: null,
              target: null,
              trailingPercent: null,
              trailingHigh: null,
              option: optionMeta,
              product,
              marginBlocked: marginNeeded,
            });
          }
        }
      }

      // Apply Stop-Loss / GTT to whatever position this order left behind.
      const finalHolding = sim.holdings.find((h) => h.symbol === symbol);
      if (finalHolding) {
        const isShort = finalHolding.qty < 0;
        if (useGtt) {
          const slPct = parseFloat(gttSlPct);
          const tgPct = parseFloat(gttTargetPct);
          finalHolding.stopLoss = isShort ? fillPrice * (1 + slPct / 100) : fillPrice * (1 - slPct / 100);
          finalHolding.target = isShort ? fillPrice * (1 - tgPct / 100) : fillPrice * (1 + tgPct / 100);
        } else if (useStoploss) {
          finalHolding.stopLoss = parseFloat(triggerPrice);
        }
      }

      sim.orders.unshift({
        id: `${Date.now()}-opt-${side.toLowerCase()}`,
        symbol,
        side,
        qty,
        price: fillPrice,
        reason: 'Manual',
        timestamp: new Date().toISOString(),
        orderKind,
        product,
        priceType,
        validity,
        validityMinutes: validity === 'MIN' ? parseInt(validityMinutes, 10) : undefined,
        disclosedQty: orderKind === 'Iceberg' ? parseInt(disclosedQty, 10) : undefined,
        triggerPrice: useStoploss ? parseFloat(triggerPrice) : undefined,
        marketProtection,
      });

      await AsyncStorage.setItem(STORAGE_KEYS.paperTrading, JSON.stringify(sim));
      Alert.alert(
        'Order placed',
        `${side} ${qty} qty of ${symbol} @ ${formatRupees(fillPrice)}. Check Paper Trading → Portfolio.`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch {
      Alert.alert('Something went wrong', 'Could not place this order — please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={18} color="#fff" />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>
              {underlying} {strike} {optType}
            </Text>
            <Text style={styles.headerSubtitle}>Expiry {expiry} · Lot {lotSize}</Text>
          </View>
        </View>
        <View style={styles.ltpRow}>
          <Text style={styles.ltpLabel}>LTP</Text>
          <Text style={styles.ltpValue}>{formatRupees(ltp)}</Text>
          <Text style={styles.spotInline}>Spot {formatRupees(spot)}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl }} keyboardShouldPersistTaps="handled">
        <Segmented
          colors={colors}
          value={side}
          onChange={setSide}
          options={[
            { key: 'BUY', label: 'BUY' },
            { key: 'SELL', label: 'SELL' },
          ]}
        />
        {side === 'SELL' && (
          <Text style={styles.helperNote}>
            {existingQty > 0
              ? `Closes your existing ${Math.min(qty, existingQty)} qty long${qty > existingQty ? `, writes ${qty - existingQty} qty new` : ''}.`
              : 'No long position held — this writes (shorts) new options. Needs margin, not the full premium.'}
          </Text>
        )}

        <Text style={styles.sectionLabel}>Order type</Text>
        <Segmented
          colors={colors}
          value={orderKind}
          onChange={setOrderKind}
          options={[
            { key: 'Regular', label: 'Regular' },
            { key: 'Iceberg', label: 'Iceberg' },
          ]}
        />

        <Text style={styles.sectionLabel}>Product</Text>
        <Segmented
          colors={colors}
          value={product}
          onChange={setProduct}
          options={[
            { key: 'MIS', label: 'Intraday (MIS)' },
            { key: 'NRML', label: 'Overnight (NRML)' },
          ]}
        />

        <View style={styles.card}>
          <View style={styles.qtyRow}>
            <Text style={styles.fieldLabel}>Lots</Text>
            <View style={styles.stepper}>
              <Pressable style={styles.stepperBtn} onPress={() => setLots((q) => Math.max(1, q - 1))}>
                <Ionicons name="remove" size={16} color={colors.primary} />
              </Pressable>
              <Text style={styles.stepperValue}>{lots}</Text>
              <Pressable style={styles.stepperBtn} onPress={() => setLots((q) => q + 1)}>
                <Ionicons name="add" size={16} color={colors.primary} />
              </Pressable>
            </View>
          </View>
          <Text style={styles.qtyHint}>{qty} qty total ({lotSize} × {lots} lot{lots > 1 ? 's' : ''})</Text>

          {orderKind === 'Iceberg' && (
            <View style={{ marginTop: spacing.sm }}>
              <Text style={styles.fieldLabel}>Disclosed qty (per leg)</Text>
              <TextInput
                style={styles.textInput}
                value={disclosedQty}
                onChangeText={setDisclosedQty}
                keyboardType="number-pad"
                placeholder={`e.g. ${Math.max(lotSize, Math.floor(qty / 2))}`}
                placeholderTextColor={colors.textLight}
              />
            </View>
          )}
        </View>

        <Text style={styles.sectionLabel}>Price</Text>
        <Segmented
          colors={colors}
          value={priceType}
          onChange={setPriceType}
          options={[
            { key: 'Market', label: 'Market' },
            { key: 'Limit', label: 'Limit' },
          ]}
        />
        {priceType === 'Limit' && (
          <TextInput
            style={[styles.textInput, { marginTop: spacing.sm }]}
            value={limitPrice}
            onChangeText={setLimitPrice}
            keyboardType="decimal-pad"
            placeholder={`e.g. ${ltp.toFixed(1)}`}
            placeholderTextColor={colors.textLight}
          />
        )}

        <View style={styles.card}>
          <View style={styles.switchRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.fieldLabel}>Stop-Loss (trigger price)</Text>
              {useStoploss && (
                <TextInput
                  style={styles.textInput}
                  value={triggerPrice}
                  onChangeText={setTriggerPrice}
                  keyboardType="decimal-pad"
                  placeholder={side === 'BUY' ? `e.g. ${(ltp * 0.8).toFixed(1)}` : `e.g. ${(ltp * 1.2).toFixed(1)}`}
                  placeholderTextColor={colors.textLight}
                />
              )}
            </View>
            <Switch
              value={useStoploss}
              onValueChange={(v) => {
                setUseStoploss(v);
                if (v) setUseGtt(false);
              }}
              trackColor={{ true: colors.primary, false: colors.border }}
            />
          </View>

          <View style={[styles.switchRow, { marginTop: spacing.sm }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.fieldLabel}>GTT (Stop-Loss% / Target%)</Text>
              {useGtt && (
                <View style={styles.gttRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.gttSub}>Stop-Loss %</Text>
                    <TextInput style={styles.textInput} value={gttSlPct} onChangeText={setGttSlPct} keyboardType="decimal-pad" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.gttSub}>Target %</Text>
                    <TextInput style={styles.textInput} value={gttTargetPct} onChangeText={setGttTargetPct} keyboardType="decimal-pad" />
                  </View>
                </View>
              )}
            </View>
            <Switch
              value={useGtt}
              onValueChange={(v) => {
                setUseGtt(v);
                if (v) setUseStoploss(false);
              }}
              trackColor={{ true: colors.primary, false: colors.border }}
            />
          </View>

          <View style={[styles.switchRow, { marginTop: spacing.sm }]}>
            <Text style={styles.fieldLabel}>Market protection</Text>
            <Switch value={marketProtection} onValueChange={setMarketProtection} trackColor={{ true: colors.primary, false: colors.border }} />
          </View>
          <Text style={styles.helperNote}>
            {marketProtection ? 'Fills at LTP exactly — no slippage.' : 'Off — a market order can fill slightly worse than LTP, like in real trading.'}
          </Text>
        </View>

        <Text style={styles.sectionLabel}>Validity</Text>
        <Segmented
          colors={colors}
          value={validity}
          onChange={setValidity}
          options={[
            { key: 'DAY', label: 'DAY' },
            { key: 'IOC', label: 'IOC' },
            { key: 'MIN', label: 'Minutes' },
          ]}
        />
        {validity === 'MIN' && (
          <TextInput
            style={[styles.textInput, { marginTop: spacing.sm, maxWidth: 120 }]}
            value={validityMinutes}
            onChangeText={setValidityMinutes}
            keyboardType="number-pad"
            placeholder="5"
            placeholderTextColor={colors.textLight}
          />
        )}

        <View style={styles.marginCard}>
          <View style={styles.marginRow}>
            <Text style={styles.marginLabel}>{side === 'BUY' ? 'Margin required (full premium)' : writeQty > 0 ? 'Margin required (writing)' : 'Proceeds (closing)'}</Text>
            <Text style={styles.marginValue}>{formatRupees(marginRequired || fillBase * closeQty)}</Text>
          </View>
          <View style={styles.marginRow}>
            <Text style={styles.marginLabel}>Available balance</Text>
            <Text style={styles.marginValue}>{formatRupees(availableCash)}</Text>
          </View>
        </View>

        <Pressable
          style={[styles.placeButton, { backgroundColor: side === 'BUY' ? colors.success : colors.danger }, submitting && { opacity: 0.6 }]}
          onPress={placeOrder}
          disabled={submitting}
        >
          <Text style={styles.placeButtonText}>
            {side} {qty} qty · {underlying} {strike} {optType}
          </Text>
        </Pressable>

        <View style={styles.demoBanner}>
          <Ionicons name="information-circle-outline" size={16} color={colors.primary} />
          <Text style={styles.demoBannerText}>
            Simulated order — margin, slippage and GTT here are simplified approximations for practice, not a real
            broker's exact numbers.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (colors: ThemeColors) => StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.md },
  headerTopRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontFamily: fonts.bold, fontSize: 16, color: '#fff' },
  headerSubtitle: { fontFamily: fonts.regular, fontSize: 11.5, color: 'rgba(255,255,255,0.75)', marginTop: 1 },
  ltpRow: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm, marginTop: spacing.md },
  ltpLabel: { fontFamily: fonts.regular, fontSize: 12, color: 'rgba(255,255,255,0.75)' },
  ltpValue: { fontFamily: fonts.displayBold, fontSize: 22, color: '#fff' },
  spotInline: { fontFamily: fonts.regular, fontSize: 11.5, color: 'rgba(255,255,255,0.7)', marginLeft: 'auto' },
  sectionLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  helperNote: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted, marginTop: spacing.xs, lineHeight: 16 },
  card: {
    marginTop: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  fieldLabel: { fontFamily: fonts.medium, fontSize: 13, color: colors.text },
  qtyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  qtyHint: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted, marginTop: 4 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  stepperBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  stepperValue: { fontFamily: fonts.semiBold, fontSize: 14, color: colors.text, minWidth: 20, textAlign: 'center' },
  textInput: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.text,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    marginTop: 4,
  },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  gttRow: { flexDirection: 'row', gap: spacing.sm, marginTop: 4 },
  gttSub: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.textMuted },
  marginCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 6,
  },
  marginRow: { flexDirection: 'row', justifyContent: 'space-between' },
  marginLabel: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.primary },
  marginValue: { fontFamily: fonts.bold, fontSize: 13.5, color: colors.primary },
  placeButton: { marginTop: spacing.lg, borderRadius: radius.md, alignItems: 'center', paddingVertical: 14 },
  placeButtonText: { fontFamily: fonts.bold, fontSize: 14, color: '#fff' },
  demoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  demoBannerText: { flex: 1, fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted, lineHeight: 16 },
});
