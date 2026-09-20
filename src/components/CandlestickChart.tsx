import { useRef, useState } from 'react';
import { View, PanResponder } from 'react-native';
import Svg, { Line, Rect, G, Text as SvgText } from 'react-native-svg';
import { useThemeColors } from '../context/ThemeContext';

export type Candle = { o: number; h: number; l: number; c: number; v?: number };

type Props = {
  data: Candle[];
  width?: number;
  height?: number;
  // Ticking current price — drawn as its own dashed line + highlighted
  // label on the price axis, independent of the (static) candle series.
  livePrice?: number;
  showVolume?: boolean;
};

function formatAxisPrice(n: number): string {
  return n.toLocaleString('en-IN', { maximumFractionDigits: n >= 1000 ? 0 : 2 });
}

// A TradingView-style candlestick chart: right-side price axis, High/Low
// reference lines, a live price line, a touch-drag crosshair with a price
// readout, and a small volume panel underneath. Drawn entirely with
// react-native-svg + PanResponder — no extra native dependency.
export default function CandlestickChart({ data, width = 320, height = 220, livePrice, showVolume = true }: Props) {
  const colors = useThemeColors();
  const [crosshairIdx, setCrosshairIdx] = useState<number | null>(null);

  const AXIS_W = 52;
  const chartW = Math.max(10, width - AXIS_W);
  const volH = showVolume ? Math.round(height * 0.16) : 0;
  const priceH = height - volH - (showVolume ? 6 : 0);

  const slotWidth = data.length > 0 ? chartW / data.length : chartW;

  const updateCrosshair = (x: number) => {
    if (!data.length) return;
    const idx = Math.max(0, Math.min(data.length - 1, Math.floor(x / slotWidth)));
    setCrosshairIdx(idx);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => updateCrosshair(e.nativeEvent.locationX),
      onPanResponderMove: (e) => updateCrosshair(e.nativeEvent.locationX),
      onPanResponderRelease: () => setCrosshairIdx(null),
      onPanResponderTerminate: () => setCrosshairIdx(null),
    })
  ).current;

  if (!data || data.length === 0) return null;

  const highs = data.map((d) => d.h);
  const lows = data.map((d) => d.l);
  const dataMax = Math.max(...highs);
  const dataMin = Math.min(...lows);
  const max = livePrice != null ? Math.max(dataMax, livePrice) : dataMax;
  const min = livePrice != null ? Math.min(dataMin, livePrice) : dataMin;
  const range = max - min || 1;
  const pad = range * 0.12;
  const yMin = min - pad;
  const yMax = max + pad;
  const yRange = yMax - yMin || 1;
  const toY = (v: number) => (priceH * (yMax - v)) / yRange;

  const candleWidth = Math.max(2, slotWidth * 0.55);
  const maxVol = showVolume ? Math.max(...data.map((d) => d.v ?? 0), 1) : 1;

  const gridLevels = 4;
  const gridPrices = Array.from({ length: gridLevels + 1 }, (_, i) => yMin + (yRange * i) / gridLevels);

  const active = crosshairIdx != null ? data[crosshairIdx] : null;

  return (
    <View {...panResponder.panHandlers}>
      <Svg width={width} height={height}>
        {gridPrices.map((p, i) => (
          <G key={`grid-${i}`}>
            <Line x1={0} y1={toY(p)} x2={chartW} y2={toY(p)} stroke={colors.border} strokeWidth={1} />
            <SvgText x={chartW + 6} y={toY(p) + 3} fontSize={9} fill={colors.textLight}>
              {formatAxisPrice(p)}
            </SvgText>
          </G>
        ))}

        <Line x1={0} y1={toY(dataMax)} x2={chartW} y2={toY(dataMax)} stroke={colors.textLight} strokeWidth={1} strokeDasharray="2,3" />
        <SvgText x={2} y={Math.max(9, toY(dataMax) - 4)} fontSize={9} fill={colors.textMuted}>
          High {formatAxisPrice(dataMax)}
        </SvgText>
        <Line x1={0} y1={toY(dataMin)} x2={chartW} y2={toY(dataMin)} stroke={colors.textLight} strokeWidth={1} strokeDasharray="2,3" />
        <SvgText x={2} y={Math.min(priceH - 3, toY(dataMin) + 11)} fontSize={9} fill={colors.textMuted}>
          Low {formatAxisPrice(dataMin)}
        </SvgText>

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

        {livePrice != null && (
          <G>
            <Line
              x1={0}
              y1={toY(livePrice)}
              x2={chartW}
              y2={toY(livePrice)}
              stroke={colors.primary}
              strokeWidth={1}
              strokeDasharray="4,3"
            />
            <Rect x={chartW} y={toY(livePrice) - 8} width={AXIS_W} height={16} fill={colors.primary} rx={2} />
            <SvgText x={chartW + 5} y={toY(livePrice) + 4} fontSize={9.5} fontWeight="bold" fill="#fff">
              {formatAxisPrice(livePrice)}
            </SvgText>
          </G>
        )}

        {active && crosshairIdx != null && (
          <G>
            <Line
              x1={crosshairIdx * slotWidth + slotWidth / 2}
              y1={0}
              x2={crosshairIdx * slotWidth + slotWidth / 2}
              y2={priceH}
              stroke={colors.textMuted}
              strokeWidth={1}
              strokeDasharray="3,3"
            />
            <Line x1={0} y1={toY(active.c)} x2={chartW} y2={toY(active.c)} stroke={colors.textMuted} strokeWidth={1} strokeDasharray="3,3" />
            <Rect x={chartW} y={toY(active.c) - 8} width={AXIS_W} height={16} fill={colors.text} rx={2} />
            <SvgText x={chartW + 5} y={toY(active.c) + 4} fontSize={9.5} fontWeight="bold" fill={colors.background}>
              {formatAxisPrice(active.c)}
            </SvgText>
          </G>
        )}

        {showVolume &&
          data.map((d, i) => {
            const cx = i * slotWidth + slotWidth / 2;
            const up = d.c >= d.o;
            const color = up ? colors.success : colors.danger;
            const vh = ((d.v ?? 0) / maxVol) * (volH - 4);
            return (
              <Rect
                key={`vol-${i}`}
                x={cx - candleWidth / 2}
                y={priceH + 6 + (volH - 4 - vh)}
                width={candleWidth}
                height={Math.max(1, vh)}
                fill={color}
                opacity={0.35}
              />
            );
          })}
      </Svg>
    </View>
  );
}
