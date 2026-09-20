import Svg, { Path, Line, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useThemeColors } from '../context/ThemeContext';
import type { ThemeColors } from '../theme/colors';

type Props = {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
  showArea?: boolean;
  showDot?: boolean;
  baseline?: number; // draws a faint dashed reference line at this value (e.g. 0 for P&L, or the starting price)
  gradientId: string; // must be unique among charts rendered on screen at once
};

// A minimal, dependency-free line/sparkline chart drawn with react-native-svg.
// Thin 2px line, rounded caps, gradient fill anchored to the chart's own
// baseline, a recessive dashed reference line, and a single end-point dot —
// no dual axis, one series per chart.
export default function PriceChart({
  data,
  width = 120,
  height = 40,
  color,
  strokeWidth = 2,
  showArea = true,
  showDot = true,
  baseline,
  gradientId,
}: Props) {
  const colors = useThemeColors();
  const resolvedColor = color ?? colors.primary;
  if (!data || data.length < 2) return null;

  const values = baseline !== undefined ? [...data, baseline] : data;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const pad = range * 0.12;
  const yMin = min - pad;
  const yMax = max + pad;
  const yRange = yMax - yMin || 1;

  const stepX = width / (data.length - 1);
  const points = data.map((v, i) => ({
    x: i * stepX,
    y: height - ((v - yMin) / yRange) * height,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');
  const last = points[points.length - 1];
  const first = points[0];
  const areaPath = `${linePath} L ${last.x.toFixed(2)} ${height} L ${first.x.toFixed(2)} ${height} Z`;
  const baselineY = baseline !== undefined ? height - ((baseline - yMin) / yRange) * height : null;

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {showArea && (
        <Defs>
          <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={resolvedColor} stopOpacity="0.28" />
            <Stop offset="1" stopColor={resolvedColor} stopOpacity="0" />
          </LinearGradient>
        </Defs>
      )}
      {baselineY !== null && (
        <Line x1={0} y1={baselineY} x2={width} y2={baselineY} stroke={colors.border} strokeWidth={1} strokeDasharray="3,3" />
      )}
      {showArea && <Path d={areaPath} fill={`url(#${gradientId})`} />}
      <Path d={linePath} stroke={resolvedColor} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {showDot && <Circle cx={last.x} cy={last.y} r={strokeWidth + 1.5} fill={resolvedColor} />}
    </Svg>
  );
}
