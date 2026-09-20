import Svg, { Line, Rect, G } from 'react-native-svg';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';

export type Candle = { o: number; h: number; l: number; c: number };

type Props = {
  data: Candle[];
  width?: number;
  height?: number;
};

// A minimal OHLC candlestick chart drawn with react-native-svg. Thin wicks,
// a small gap between candles, and the standard green/red status coloring —
// no dependency, no dual axis, one instrument per chart.
export default function CandlestickChart({ data, width = 320, height = 180 }: Props) {
  const colors = useThemeColors();
  if (!data || data.length === 0) return null;

  const highs = data.map((d) => d.h);
  const lows = data.map((d) => d.l);
  const max = Math.max(...highs);
  const min = Math.min(...lows);
  const range = max - min || 1;
  const pad = range * 0.1;
  const yMin = min - pad;
  const yMax = max + pad;
  const yRange = yMax - yMin || 1;
  const toY = (v: number) => height - ((v - yMin) / yRange) * height;

  const slotWidth = width / data.length;
  const candleWidth = Math.max(2, slotWidth * 0.55);

  return (
    <Svg width={width} height={height}>
      {[0.25, 0.5, 0.75].map((f) => (
        <Line key={f} x1={0} y1={height * f} x2={width} y2={height * f} stroke={colors.border} strokeWidth={1} />
      ))}
      {data.map((d, i) => {
        const cx = i * slotWidth + slotWidth / 2;
        const up = d.c >= d.o;
        const color = up ? colors.success : colors.danger;
        const bodyTop = toY(Math.max(d.o, d.c));
        const bodyBottom = toY(Math.min(d.o, d.c));
        const bodyHeight = Math.max(1.5, bodyBottom - bodyTop);
        return (
          <G key={i}>
            <Line x1={cx} y1={toY(d.h)} x2={cx} y2={toY(d.l)} stroke={color} strokeWidth={1.4} />
            <Rect x={cx - candleWidth / 2} y={bodyTop} width={candleWidth} height={bodyHeight} fill={color} rx={1} />
          </G>
        );
      })}
    </Svg>
  );
}
