// Real chart/diagram images pulled from the user's TradeWise course PDFs
// ("Enhanced Edition — with Charts & Diagrams" + the separate Technical
// Analysis supplement). Same images across all 3 language editions (the
// book itself reuses the English-labelled charts everywhere), so this map
// is language-independent — keyed by lesson id.
export interface LessonImage {
  source: number; // require() result
  caption: string;
}

export const lessonImages: Record<number, LessonImage[]> = {
  16: [{ source: require('../../assets/lessons/lesson16_balance_sheet.png'), caption: 'The accounting equation: Assets = Liabilities + Shareholders’ Equity' }],
  24: [{ source: require('../../assets/lessons/lesson24_candlestick_anatomy.png'), caption: 'Anatomy of a candlestick' }],
  25: [{ source: require('../../assets/lessons/lesson25_chart_types.png'), caption: 'Line, Bar (OHLC) and Candlestick charts of the same data' }],
  26: [{ source: require('../../assets/lessons/lesson26_support_resistance.png'), caption: 'Support and resistance: the floor and ceiling price respects' }],
  27: [{ source: require('../../assets/lessons/lesson27_moving_averages.png'), caption: 'Moving averages smooth the noise into a trend — the Golden Cross' }],
  30: [{ source: require('../../assets/lessons/lesson30_diversification.png'), caption: 'One sector vs. spreading across sectors and asset types' }],
  36: [
    { source: require('../../assets/lessons/lesson36_head_shoulders.png'), caption: 'Head & Shoulders: a classic trend-reversal pattern' },
    { source: require('../../assets/lessons/lesson36_triangle.png'), caption: 'Triangle: price compresses, then often resumes the trend' },
  ],
  37: [{ source: require('../../assets/lessons/lesson37_rsi.png'), caption: 'Price vs. RSI — overbought (70) and oversold (30) zones' }],
  38: [{ source: require('../../assets/lessons/lesson38_macd.png'), caption: 'MACD: two moving averages, and the gap between them' }],
  39: [{ source: require('../../assets/lessons/lesson39_bollinger_bands.png'), caption: 'Bollinger Bands widen and narrow with volatility' }],
  40: [{ source: require('../../assets/lessons/lesson40_options_payoff.png'), caption: 'Call buyer (right to buy) vs. Put buyer (right to sell) payoff' }],
  41: [{ source: require('../../assets/lessons/lesson41_futures_vs_options.png'), caption: 'Obligation (futures) vs. right (options) — payoff comparison' }],
  23: [
    { source: require('../../assets/lessons/lesson23_tech_fig1_candle.png'), caption: 'Figure 1 — Bullish vs. bearish candle anatomy' },
    { source: require('../../assets/lessons/lesson23_tech_fig2_trend.png'), caption: 'Figure 2 — Uptrend (higher highs/lows) vs. downtrend (lower highs/lows)' },
    { source: require('../../assets/lessons/lesson23_tech_fig3_support_resistance.png'), caption: 'Figure 3 — Support & resistance: price repeatedly turns at the same levels' },
    { source: require('../../assets/lessons/lesson23_tech_fig4_head_shoulders.png'), caption: 'Figure 4 — Head & Shoulders reversal pattern' },
    { source: require('../../assets/lessons/lesson23_tech_fig5_double_top_bottom.png'), caption: 'Figure 5 — Double top vs. double bottom' },
    { source: require('../../assets/lessons/lesson23_tech_fig6_candle_patterns.png'), caption: 'Figure 6 — Doji, Hammer, Bullish engulfing, Shooting star' },
  ],
};
