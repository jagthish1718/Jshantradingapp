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
// mapping here whenever one is added to INSTRUMENTS — the widget falls
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

// A real TradingView chart (candles, indicators, drawing tools — trend
// lines, Fibonacci, the works) embedded via TradingView's own free,
// no-signup "Advanced Real-Time Chart" widget. This shows the REAL
// market's price action on the real symbol, not this app's simulated
// paper-trading price — it's for reading and marking up a chart the way a
// real trader would, not for placing an order (that stays on the Paper
// Trading tab's own screen, which is intentionally kept simple).
function buildHtml(symbol: string, dark: boolean) {
  const theme = dark ? 'dark' : 'light';
  const bg = dark ? '#131722' : '#ffffff';
  return `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <style>
    html, body { margin:0; padding:0; height:100%; background:${bg}; }
    #tv_chart { height:100%; width:100%; }
  </style>
</head>
<body>
  <div id="tv_chart"></div>
  <script src="https://s3.tradingview.com/tv.js"></script>
  <script>
    new TradingView.widget({
      autosize: true,
      symbol: "${symbol}",
      interval: "15",
      timezone: "Asia/Kolkata",
      theme: "${theme}",
      style: "1",
      locale: "en",
      toolbar_bg: "${bg}",
      enable_publishing: false,
      allow_symbol_change: false,
      hide_side_toolbar: false,
      withdateranges: true,
      studies: ["RSI@tv-basicstudies", "MACD@tv-basicstudies"],
      container_id: "tv_chart"
    });
  </script>
</body>
</html>`;
}

export default function ProChartScreen({ navigation, route }: Props) {
  const { isDark, colors } = useTheme();
  const styles = makeStyles(colors);
  const { symbol } = route.params;
  const tvSymbol = TV_SYMBOL[symbol] ?? `NSE:${symbol.replace(/\s+/g, '')}`;
  const html = useMemo(() => buildHtml(tvSymbol, isDark), [tvSymbol, isDark]);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={18} color="#fff" />
        </Pressable>
        <View style={{ flex: 1, marginLeft: spacing.sm }}>
          <Text style={styles.headerTitle}>Pro Chart</Text>
          <Text style={styles.headerSub}>{symbol} · live market data</Text>
        </View>
      </View>

      <View style={styles.infoBanner}>
        <Ionicons name="information-circle-outline" size={14} color={colors.primary} />
        <Text style={styles.infoBannerText}>
          Real TradingView chart with indicators & drawing tools. This shows the real market — to place a practice
          order, go back to Paper Trading.
        </Text>
      </View>

      <WebView
        source={{ html }}
        style={styles.webview}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
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
    infoBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      backgroundColor: colors.primaryLight,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    infoBannerText: { flex: 1, fontFamily: fonts.regular, fontSize: 10.5, color: colors.primary, lineHeight: 14 },
    webview: { flex: 1, backgroundColor: colors.background },
  });
