import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Pressable, Text, SafeAreaView, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, radius, fonts } from '../theme/spacing';
import { ensureStarted, subscribe, getPrice, optionPremium, FRACTIONAL_VOL_PER_MINUTE } from '../data/marketSim';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';

type Candle = { time: number; o: number; h: number; l: number; c: number; v: number };

type Timeframe = '1' | '2' | '3' | '5' | '10' | '15' | '20' | '25' | '30' | 'D' | 'W' | 'M';

const TIMEFRAMES: { key: Timeframe; label: string; minutes: number; count: number }[] = [
  { key: '1', label: '1m', minutes: 1, count: 60 },
  { key: '2', label: '2m', minutes: 2, count: 60 },
  { key: '3', label: '3m', minutes: 3, count: 60 },
  { key: '5', label: '5m', minutes: 5, count: 60 },
  { key: '10', label: '10m', minutes: 10, count: 60 },
  { key: '15', label: '15m', minutes: 15, count: 60 },
  { key: '20', label: '20m', minutes: 20, count: 60 },
  { key: '25', label: '25m', minutes: 25, count: 60 },
  { key: '30', label: '30m', minutes: 30, count: 60 },
  { key: 'D', label: 'Day', minutes: 1440, count: 30 },
  { key: 'W', label: 'Week', minutes: 1440 * 7, count: 26 },
  { key: 'M', label: 'Month', minutes: 1440 * 30, count: 24 },
];

// Every other interval's per-candle volatility scales off marketSim's own
// live-tick pace by sqrt(minutes) -- same technique the old (now removed)
// custom chart used, so the synthetic history never looks wilder/calmer
// than the real ticking price next to it.
function volForMinutes(minutes: number): number {
  return FRACTIONAL_VOL_PER_MINUTE * Math.sqrt(minutes);
}

// Synthetic candle history anchored so the series ends exactly at
// `anchorPrice`, each bar given a real, strictly-increasing timestamp
// ending "now" (Lightweight Charts requires ascending, unique times).
function genCandles(anchorPrice: number, count: number, volPct: number, intervalSec: number): Candle[] {
  const base = anchorPrice;
  const nowSec = Math.floor(Date.now() / 1000);
  const raw: { o: number; h: number; l: number; c: number; v: number }[] = [];
  let price = base * (0.94 + Math.random() * 0.06);
  for (let i = 0; i < count; i++) {
    const o = price;
    const change = (Math.random() - 0.47) * base * volPct;
    const c = Math.max(base * 0.5, o + change);
    const wick = base * volPct * 0.7;
    const h = Math.max(o, c) + Math.random() * wick;
    const l = Math.max(base * 0.4, Math.min(o, c) - Math.random() * wick);
    const v = Math.round(40000 + Math.random() * 160000);
    raw.push({ o, h, l, c, v });
    price = c;
  }
  const drift = anchorPrice - raw[raw.length - 1].c;
  return raw.map((d, i) => ({
    time: nowSec - (count - 1 - i) * intervalSec,
    o: Math.round((d.o + drift) * 100) / 100,
    h: Math.round((d.h + drift) * 100) / 100,
    l: Math.round((d.l + drift) * 100) / 100,
    c: Math.round((d.c + drift) * 100) / 100,
    v: d.v,
  }));
}

// Runs an underlying candle through the exact same optionPremium() formula
// the rest of the app prices this option with -- so an option position's
// chart is mathematically consistent with its LTP, not a separate random
// walk. optionPremium isn't monotonic the same way for CE vs PE, so the
// wick's high/low is derived from all four priced corners.
function toOptionCandle(u: Candle, strike: number, isCall: boolean): Candle {
  const oPrem = optionPremium(u.o, strike, isCall);
  const cPrem = optionPremium(u.c, strike, isCall);
  const hPrem = optionPremium(u.h, strike, isCall);
  const lPrem = optionPremium(u.l, strike, isCall);
  const vals = [oPrem, cPrem, hPrem, lPrem];
  return { time: u.time, o: oPrem, h: Math.max(...vals), l: Math.min(...vals), c: cPrem, v: u.v };
}

function formatRupees(n: number) {
  return `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

// The chart itself: TradingView's own free, open-source Lightweight
// Charts library (not the hosted widget we use for Pro Chart -- a plain
// JS charting engine we feed OUR OWN data to), so candles render with the
// same crisp, professional look as a real TradingView chart instead of
// the old hand-drawn SVG one students found "cartoonish". Runs entirely
// off this position's own simulated price series (with a marked Entry
// line), so it actually corresponds to what the student's paper money is
// riding on -- unlike Pro Chart, which shows the real market and has no
// idea what price a paper position was filled at.
function buildChartHtml(dark: boolean, colors: ThemeColors) {
  const bg = dark ? '#131722' : '#ffffff';
  const text = dark ? '#d1d4dc' : colors.text;
  const grid = dark ? '#1e222d' : '#eef0f3';
  const upColor = colors.success;
  const downColor = colors.danger;
  const border = dark ? '#2a2e39' : colors.border;
  const chip = dark ? '#1e222d' : colors.surface;
  const chipActive = colors.primary;
  const chipText = dark ? '#d1d4dc' : colors.textMuted;

  return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<script src="https://unpkg.com/lightweight-charts@5/dist/lightweight-charts.standalone.production.js"></script>
<style>
  html, body { margin:0; padding:0; height:100%; background:${bg}; overflow:hidden; font-family:sans-serif; }
  #wrap { display:flex; flex-direction:column; height:100%; }
  #chartOuter { position:relative; flex:1; min-height:0; }
  #chart { position:absolute; inset:0; }
  #toolbar { display:flex; flex-wrap:nowrap; overflow-x:auto; gap:6px; padding:7px 8px; background:${chip}; border-top:1px solid ${border}; -webkit-overflow-scrolling:touch; }
  .btn { flex:0 0 auto; padding:6px 11px; border-radius:14px; background:${bg}; border:1px solid ${border}; color:${chipText}; font-size:11px; font-weight:600; }
  .btn.active { background:${chipActive}; border-color:${chipActive}; color:#fff; }
  .sep { width:1px; align-self:stretch; background:${border}; margin:2px 3px; flex:0 0 auto; }
  #hint { position:absolute; top:8px; left:8px; font-size:10.5px; color:#fff; background:${chipActive}; padding:4px 9px; border-radius:8px; pointer-events:none; opacity:0; transition:opacity .15s; }
</style>
</head>
<body>
<div id="wrap">
  <div id="chartOuter">
    <div id="chart"></div>
    <div id="hint"></div>
  </div>
  <div id="toolbar">
    <button class="btn active" id="tool-cursor" onclick="setTool('cursor')">Cursor</button>
    <button class="btn" id="tool-trend" onclick="setTool('trend')">Trend Line</button>
    <button class="btn" id="tool-hline" onclick="setTool('hline')">H-Line</button>
    <button class="btn" onclick="clearDrawings()">Clear</button>
    <div class="sep"></div>
    <button class="btn active" id="ind-ma" onclick="toggleInd('ma')">MA</button>
    <button class="btn" id="ind-rsi" onclick="toggleInd('rsi')">RSI</button>
    <button class="btn" id="ind-macd" onclick="toggleInd('macd')">MACD</button>
    <button class="btn active" id="ind-vol" onclick="toggleInd('vol')">Vol</button>
  </div>
</div>
<script>
(function () {
  var chart = LightweightCharts.createChart(document.getElementById('chart'), {
    layout: { background: { color: '${bg}' }, textColor: '${text}' },
    grid: { vertLines: { color: '${grid}' }, horzLines: { color: '${grid}' } },
    rightPriceScale: { borderColor: '${border}' },
    timeScale: { borderColor: '${border}', timeVisible: true, secondsVisible: false },
    crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
    autoSize: true,
  });

  var candleSeries = chart.addSeries(LightweightCharts.CandlestickSeries, {
    upColor: '${upColor}', downColor: '${downColor}', borderVisible: false,
    wickUpColor: '${upColor}', wickDownColor: '${downColor}',
  }, 0);

  var volSeries = chart.addSeries(LightweightCharts.HistogramSeries, {
    priceFormat: { type: 'volume' }, priceScaleId: '',
  }, 0);
  volSeries.priceScale().applyOptions({ scaleMargins: { top: 0.85, bottom: 0 } });

  var ma9Series = chart.addSeries(LightweightCharts.LineSeries, { color: '#f5a623', lineWidth: 1, lastValueVisible: false, priceLineVisible: false }, 0);
  var ma21Series = chart.addSeries(LightweightCharts.LineSeries, { color: '#7e57c2', lineWidth: 1, lastValueVisible: false, priceLineVisible: false }, 0);

  // Lightweight Charts enforces a 30px floor on pane height (anything
  // lower is just ignored), so "hidden" for the RSI/MACD panes means
  // collapsed to that floor with an empty, series-less band -- not
  // literally 0px. Still reads as closed at a glance.
  var PANE_MIN = 30;
  var PANE_OPEN = 90;
  var rsiSeries = chart.addSeries(LightweightCharts.LineSeries, { color: '#26c6da', lineWidth: 1.4, visible: false }, 1);
  chart.panes()[1].setHeight(PANE_MIN);
  var rsi70Line = null, rsi30Line = null;

  var macdLineSeries = chart.addSeries(LightweightCharts.LineSeries, { color: '#2962ff', lineWidth: 1.2, visible: false }, 2);
  var macdSignalSeries = chart.addSeries(LightweightCharts.LineSeries, { color: '#ff6d00', lineWidth: 1.2, visible: false }, 2);
  var macdHistSeries = chart.addSeries(LightweightCharts.HistogramSeries, { color: '${upColor}', visible: false }, 2);
  chart.panes()[2].setHeight(PANE_MIN);

  function resizeChart() {
    var outer = document.getElementById('chartOuter');
    var toolbarEl = document.getElementById('toolbar');
    var w = outer.clientWidth || window.innerWidth;
    var h = outer.clientHeight || (window.innerHeight - (toolbarEl ? toolbarEl.offsetHeight : 0));
    if (w > 0 && h > 0) chart.resize(w, h);
  }
  window.addEventListener('load', resizeChart);
  window.addEventListener('resize', resizeChart);
  if (window.ResizeObserver) {
    new ResizeObserver(resizeChart).observe(document.getElementById('chartOuter'));
  }
  setTimeout(resizeChart, 50);
  setTimeout(resizeChart, 300);
  setTimeout(resizeChart, 800);
  setTimeout(resizeChart, 1500);

  var entryLine = null;
  var currentCandles = [];

  function toBar(c) { return { time: c.time, open: c.o, high: c.h, low: c.l, close: c.c }; }
  function toVolBar(c) { return { time: c.time, value: c.v, color: c.c >= c.o ? '${upColor}66' : '${downColor}66' }; }

  function sma(values, period) {
    var out = [];
    for (var i = 0; i < values.length; i++) {
      if (i < period - 1) { out.push(null); continue; }
      var sum = 0;
      for (var j = i - period + 1; j <= i; j++) sum += values[j];
      out.push(sum / period);
    }
    return out;
  }
  function ema(values, period) {
    var k = 2 / (period + 1);
    var out = []; var prev = null;
    for (var i = 0; i < values.length; i++) {
      prev = prev === null ? values[i] : values[i] * k + prev * (1 - k);
      out.push(prev);
    }
    return out;
  }
  function rsi(values, period) {
    period = period || 14;
    var out = new Array(values.length).fill(null);
    var gainSum = 0, lossSum = 0;
    for (var i = 1; i < values.length; i++) {
      var diff = values[i] - values[i - 1];
      var gain = Math.max(0, diff), loss = Math.max(0, -diff);
      if (i <= period) {
        gainSum += gain; lossSum += loss;
        if (i === period) {
          var rs0 = lossSum === 0 ? 100 : gainSum / lossSum;
          out[i] = 100 - 100 / (1 + rs0);
        }
      } else {
        gainSum = (gainSum * (period - 1) + gain) / period;
        lossSum = (lossSum * (period - 1) + loss) / period;
        var rs = lossSum === 0 ? 100 : gainSum / lossSum;
        out[i] = 100 - 100 / (1 + rs);
      }
    }
    return out;
  }
  function toSeriesData(times, values) {
    var out = [];
    for (var i = 0; i < values.length; i++) {
      var v = values[i];
      if (v !== null && v !== undefined && !isNaN(v)) out.push({ time: times[i], value: v });
    }
    return out;
  }

  function recomputeIndicators(candles) {
    var times = candles.map(function (c) { return c.time; });
    var closes = candles.map(function (c) { return c.c; });

    ma9Series.setData(toSeriesData(times, sma(closes, 9)));
    ma21Series.setData(toSeriesData(times, sma(closes, 21)));

    var rsiVals = rsi(closes, 14);
    rsiSeries.setData(toSeriesData(times, rsiVals));
    if (rsi70Line) { rsiSeries.removePriceLine(rsi70Line); rsiSeries.removePriceLine(rsi30Line); }
    rsi70Line = rsiSeries.createPriceLine({ price: 70, color: '${border}', lineWidth: 1, lineStyle: LightweightCharts.LineStyle.Dotted, axisLabelVisible: false, title: '' });
    rsi30Line = rsiSeries.createPriceLine({ price: 30, color: '${border}', lineWidth: 1, lineStyle: LightweightCharts.LineStyle.Dotted, axisLabelVisible: false, title: '' });

    var emaFast = ema(closes, 12), emaSlow = ema(closes, 26);
    var macdLine = closes.map(function (_, i) { return emaFast[i] - emaSlow[i]; });
    var signal = ema(macdLine, 9);
    var hist = macdLine.map(function (v, i) { return v - signal[i]; });
    macdLineSeries.setData(toSeriesData(times, macdLine));
    macdSignalSeries.setData(toSeriesData(times, signal));
    macdHistSeries.setData(times.map(function (t, i) { return { time: t, value: hist[i] || 0, color: (hist[i] || 0) >= 0 ? '${upColor}' : '${downColor}' }; }));
  }

  function applyCandles(candles) {
    currentCandles = candles;
    candleSeries.setData(candles.map(toBar));
    volSeries.setData(candles.map(toVolBar));
    recomputeIndicators(candles);
    chart.timeScale().fitContent();
    resizeChart();
  }

  window.setCandles = function (json) { applyCandles(JSON.parse(json)); };
  window.updateLastCandle = function (json) {
    var c = JSON.parse(json);
    if (currentCandles.length && currentCandles[currentCandles.length - 1].time === c.time) {
      currentCandles[currentCandles.length - 1] = c;
    } else {
      currentCandles.push(c);
    }
    candleSeries.update(toBar(c));
    volSeries.update(toVolBar(c));
    recomputeIndicators(currentCandles);
  };
  window.setEntryPrice = function (price) {
    if (entryLine) candleSeries.removePriceLine(entryLine);
    entryLine = candleSeries.createPriceLine({
      price: price, color: '#2962ff', lineWidth: 2,
      lineStyle: LightweightCharts.LineStyle.Dashed, axisLabelVisible: true,
      title: 'Entry ' + price.toFixed(2),
    });
  };

  // Drawing tools -- tap-to-place rather than drag-to-draw: simpler and
  // more reliable on touch. Trend Line takes two taps (first sets point
  // A, second draws A-to-B as a tiny 2-point line series); H-Line places
  // on a single tap as a price line.
  var tool = 'cursor';
  var pending = null;
  var drawings = [];
  var hintEl = document.getElementById('hint');

  window.setTool = function (t) {
    tool = t;
    pending = null;
    ['cursor', 'trend', 'hline'].forEach(function (id) {
      document.getElementById('tool-' + id).classList.toggle('active', id === t);
    });
    if (t === 'trend') { hintEl.style.opacity = '1'; hintEl.textContent = 'Tap first point'; }
    else { hintEl.style.opacity = '0'; }
  };

  window.toggleInd = function (id) {
    var btn = document.getElementById('ind-' + id);
    var on = !btn.classList.contains('active');
    btn.classList.toggle('active', on);
    if (id === 'ma') { ma9Series.applyOptions({ visible: on }); ma21Series.applyOptions({ visible: on }); }
    if (id === 'rsi') { rsiSeries.applyOptions({ visible: on }); chart.panes()[1].setHeight(on ? PANE_OPEN : PANE_MIN); }
    if (id === 'macd') {
      macdLineSeries.applyOptions({ visible: on });
      macdSignalSeries.applyOptions({ visible: on });
      macdHistSeries.applyOptions({ visible: on });
      chart.panes()[2].setHeight(on ? PANE_OPEN : PANE_MIN);
    }
    if (id === 'vol') { volSeries.applyOptions({ visible: on }); }
  };

  window.clearDrawings = function () {
    drawings.forEach(function (d) {
      if (d.type === 'hline') candleSeries.removePriceLine(d.ref);
      else chart.removeSeries(d.ref);
    });
    drawings = [];
    pending = null;
    if (tool === 'trend') hintEl.textContent = 'Tap first point';
  };

  chart.subscribeClick(function (param) {
    if (tool === 'cursor' || !param.point) return;
    var price = candleSeries.coordinateToPrice(param.point.y);
    if (price === null) return;

    if (tool === 'hline') {
      var pl = candleSeries.createPriceLine({
        price: price, color: '#ff6d00', lineWidth: 2,
        lineStyle: LightweightCharts.LineStyle.Solid, axisLabelVisible: true,
        title: price.toFixed(2),
      });
      drawings.push({ type: 'hline', ref: pl });
      return;
    }

    if (tool === 'trend') {
      var time = param.time;
      if (!time) return;
      if (!pending) {
        pending = { time: time, price: price };
        hintEl.textContent = 'Tap second point';
      } else {
        var pts = [pending, { time: time, price: price }].sort(function (a, b) { return a.time - b.time; });
        if (pts[0].time !== pts[1].time) {
          var line = chart.addSeries(LightweightCharts.LineSeries, {
            color: '#ff6d00', lineWidth: 2, lastValueVisible: false, priceLineVisible: false,
          }, 0);
          line.setData([{ time: pts[0].time, value: pts[0].price }, { time: pts[1].time, value: pts[1].price }]);
          drawings.push({ type: 'trend', ref: line });
        }
        pending = null;
        hintEl.textContent = 'Tap first point';
      }
    }
  });
})();
</script>
</body>
</html>`;
}

type Props = NativeStackScreenProps<HomeStackParamList, 'PositionChart'>;

export default function PositionChartScreen({ navigation, route }: Props) {
  const { isDark, colors } = useTheme();
  const styles = makeStyles(colors);
  const { symbol, qty, avgPrice, option } = route.params;
  const webviewRef = useRef<WebView>(null);

  const underlyingSymbol = option ? option.underlying : symbol;
  const isCall = option?.type === 'CE';

  const [timeframe, setTimeframe] = useState<Timeframe>('15');
  const tf = TIMEFRAMES.find((t) => t.key === timeframe)!;

  const underlyingCandlesRef = useRef<Candle[]>([]);
  const rolloverAtRef = useRef<number>(Date.now());
  const [, bump] = useState(0);

  const html = useMemo(() => buildChartHtml(isDark, colors), [isDark]);

  const displayCandles = (): Candle[] =>
    option ? underlyingCandlesRef.current.map((u) => toOptionCandle(u, option.strike, isCall)) : underlyingCandlesRef.current;

  const pushFullSeries = () => {
    const jsonPayload = JSON.stringify(displayCandles());
    const jsLiteral = JSON.stringify(jsonPayload);
    webviewRef.current?.injectJavaScript(
      `window.setCandles && window.setCandles(${jsLiteral}); window.clearDrawings && window.clearDrawings(); true;`
    );
  };

  useEffect(() => {
    ensureStarted();
    const anchor = getPrice(underlyingSymbol) || avgPrice;
    underlyingCandlesRef.current = genCandles(anchor, tf.count, volForMinutes(tf.minutes), tf.minutes * 60);
    rolloverAtRef.current = Date.now();
    pushFullSeries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeframe]);

  useEffect(() => {
    const unsub = subscribe(() => {
      const price = getPrice(underlyingSymbol);
      const intervalMs = tf.minutes * 60 * 1000;
      const prev = underlyingCandlesRef.current;
      if (prev.length === 0) return;
      const last = prev[prev.length - 1];
      const now = Date.now();
      let nextArr: Candle[];
      if (now - rolloverAtRef.current >= intervalMs) {
        rolloverAtRef.current = now;
        const fresh: Candle = {
          time: Math.floor(now / 1000),
          o: price,
          h: price,
          l: price,
          c: price,
          v: Math.round(40000 + Math.random() * 160000),
        };
        const kept = prev.length >= tf.count ? prev.slice(prev.length - tf.count + 1) : prev;
        nextArr = [...kept, fresh];
      } else {
        const updated: Candle = {
          ...last,
          c: price,
          h: Math.max(last.h, price),
          l: Math.min(last.l, price),
          v: last.v + Math.round(500 + Math.random() * 2000),
        };
        nextArr = [...prev.slice(0, -1), updated];
      }
      underlyingCandlesRef.current = nextArr;
      const lastRaw = nextArr[nextArr.length - 1];
      const lastDisplay = option ? toOptionCandle(lastRaw, option.strike, isCall) : lastRaw;
      const jsonPayload = JSON.stringify(lastDisplay);
      const jsLiteral = JSON.stringify(jsonPayload);
      webviewRef.current?.injectJavaScript(`window.updateLastCandle && window.updateLastCandle(${jsLiteral}); true;`);
      bump((n) => n + 1);
    });
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeframe, underlyingSymbol, option?.strike, option?.type]);

  const livePrice = option ? optionPremium(getPrice(underlyingSymbol), option.strike, isCall) : getPrice(underlyingSymbol);
  const pnl = (livePrice - avgPrice) * qty;

  const onWebViewLoad = () => {
    pushFullSeries();
    webviewRef.current?.injectJavaScript(`window.setEntryPrice && window.setEntryPrice(${avgPrice}); true;`);
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={18} color="#fff" />
        </Pressable>
        <View style={{ flex: 1, marginLeft: spacing.sm }}>
          <Text style={styles.headerTitle}>{symbol}</Text>
          <Text style={styles.headerSub}>
            Entry {formatRupees(avgPrice)} · LTP {formatRupees(livePrice)}
          </Text>
        </View>
        <Text style={[styles.pnlText, { color: pnl >= 0 ? '#5CF08A' : '#FF8A8A' }]}>
          {pnl >= 0 ? '+' : ''}
          {formatRupees(pnl)}
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tfRowOuter}
        contentContainerStyle={styles.tfRow}
      >
        {TIMEFRAMES.map((t) => (
          <Pressable
            key={t.key}
            style={[styles.tfChip, timeframe === t.key && styles.tfChipActive]}
            onPress={() => setTimeframe(t.key)}
          >
            <Text style={[styles.tfChipText, timeframe === t.key && styles.tfChipTextActive]}>{t.label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <WebView
        ref={webviewRef}
        source={{ html }}
        style={styles.webview}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        onLoad={onWebViewLoad}
      />
    </SafeAreaView>
  );
}

const makeStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.md,
    },
    backButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: 'rgba(255,255,255,0.18)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerTitle: { fontFamily: fonts.bold, fontSize: 15.5, color: '#fff' },
    headerSub: { fontFamily: fonts.regular, fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 1 },
    pnlText: { fontFamily: fonts.bold, fontSize: 13.5 },
    tfRowOuter: { flexGrow: 0, flexShrink: 0 },
    tfRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tfChip: {
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 36,
      paddingVertical: 6,
      paddingHorizontal: spacing.sm,
      borderRadius: radius.pill,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
    },
    tfChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
    tfChipText: { fontFamily: fonts.semiBold, fontSize: 11.5, color: colors.textMuted },
    tfChipTextActive: { color: '#fff' },
    webview: { flex: 1, backgroundColor: colors.background },
  });
