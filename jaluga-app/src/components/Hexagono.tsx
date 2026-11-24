import type { ReactNode } from 'react';
import { View } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import type { Cor } from '../theme/colors';

interface HexagonoProps {
  size: number;
  fill: Cor;
  stroke?: Cor;
  children?: ReactNode;
}

// Hexágono (casco do jabuti), com conteúdo centralizado.
export function Hexagono({ size, fill, stroke, children }: HexagonoProps) {
  const pontos = '50,2 93,26 93,74 50,98 7,74 7,26';
  return (
    <View style={{ width: size, height: size }} className="items-center justify-center">
      <Svg width={size} height={size} viewBox="0 0 100 100" style={{ position: 'absolute' }}>
        <Polygon points={pontos} fill={fill} stroke={stroke} strokeWidth={stroke ? 4 : 0} />
      </Svg>
      {children}
    </View>
  );
}
