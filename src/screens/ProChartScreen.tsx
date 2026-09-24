import { useMemo } from 'react';
import { StyleSheet, View, Pressable, Text, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';
import { spacing, fonts } from '../theme/spacing';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';

// Maps this app's own instrument symbols (src/data/instruments.ts) to the
// exact ticker TradingView's public widget expects. Add a new instrument's
// mapping here whenever one is added to INSTRUMENTS -- the widget falls
// back to a plain "NSE:<symbol>" guess otherwise, which is right for most
// single stocks but wrong for the Nifty 50 index.
const TV_SYMBOL: Record<string, string> = {
  'NIFTY 50': 'NSE:NIFTY',
  RELIANCE: 'NSE:RELIANCE',
  TCS: 'NSE:TCS',
  INFY: 'NSE:INFY',
  HDFCBANK: 'NSE:HDFCBANK',
  ICICIBANK: 'NSE:ICICIBANK',
};

type Props = NativeStackScreenProps<HomeStackParamList, 'ProChart'>;

// A real TradingView chart (candles, indicators, drawing tools -- trend
// lines, Fibonacci, the works) embedded via TradingView's own free,
// no-signup "Advanced Real-Time Chart" widget. This shows the REAL
// market's price action on the real symbol, not this app's simulated
// paper-trading price -- it's for reading and marking up a chart the way a
// real trader would, not for placing an order (that stays on the Paper
// Trading tab's own screen, which is intentionally kept simple).
//
// We navigate the WebView directly to TradingView's own widget page
// (s.tradingview.com/widgetembed) instead of wrapping the widget script
// in our own blank HTML shell. That matters for one reason: when the
// widget is loaded from OUR html (no real origin), any TradingView login
// it starts (the "Join for free" prompt that unlocks the full indicator
// list and every drawing tool) can't reliably keep its session -- cookies
// set on tradingview.com don't stick to a page with no stable origin of
// its own. Loading the real widgetembed URL as the top-level page makes
// TradingView.com the WebView's actual origin, so a student who signs in
// once (free account) stays signed in on this screen from then on, same
// as any other website login in the app.
function buildUrl(symbol: string, dark: boolean) {
  const bg = dark ? '131722' : 'ffffff';
  const params: Record<string, string> = {
    symbol,
    interval: '15',
    hidesidetoolbar: '0',
    saveimage: '0',
    toolbarbg: bg,
    studies: JSON.stringify(['RSI@tv-basicstudies', 'MACD@tv-basicstudies']),
    hideideas: '1',
    theme: dark ? 'dark' : 'light',
    style: '1',
    timezone: 'Asia/Kolkata',
    studies_overrides: '{}',
    overrides: '{}',
    enabled_features: '[]',
    disabled_features: '[]',
    locale: 'en',
  };
  const qs = Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  return `https://s.tradingview.com/widgetembed/?${qs}`;
}

export default function ProChartScreen({ navigation, route }: Props) {
  const { isDark, colors } = useTheme();
  const styles = makeStyles(colors);
  const { symbol } = route.params;
  const tvSymbol = TV_SYMBOL[symbol] ?? `NSE:${symbol.replace(/\s+/g, '')}`;
  const url = useMemo(() => buildUrl(tvSymbol, isDark), [tvSymbol, isDark]);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={18} color="#fff" />
        </Pressable>
        <View style={{ flex: 1, marginLeft: spacing.sm }}>
          <Text style={styles.headerTitle}>Pro Chart</Text>
          <Text style={styles.headerSub}>{symbol} - live market data</Text>
        </View>
      </View>

      <WebView
        source={{ uri: url }}
        style={styles.webview}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        startInLoadingState
        // TradingView's sign-in flow opens its email/OTP step with
        // window.open(), which a plain WebView silently swallows -- no new
        // tab exists to show it, so the page just sits there looking stuck.
        // Forcing window.open() to navigate the current WebView instead
        // (and, on Android, telling the WebView not to expect a separate
        // popup window) makes that same flow happen in-place.
        javaScriptCanOpenWindowsAutomatically
        setSupportMultipleWindows={false}
        injectedJavaScriptBeforeContentLoaded={`
          (function() {
            window.open = function(url) {
              if (url) { window.location.href = url; }
              return null;
            };
          })();
          true;
        `}
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
    headerTitle: { fontFamily: fonts.bold, fontSize: 16, color: '#fff' },
    headerSub: { fontFamily: fonts.regular, fontSize: 11.5, color: 'rgba(255,255,255,0.75)', marginTop: 1 },
    webview: { flex: 1, backgroundColor: colors.background },
  });
