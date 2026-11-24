import { useEffect, useRef } from 'react';
import { Animated, type DimensionValue } from 'react-native';
import { cores } from '../theme/colors';

interface SkeletonProps {
  width?: DimensionValue;
  height: number;
  radius?: 'card' | 'control' | 'pill';
}

const raios = { card: 12, control: 8, pill: 999 };

export function Skeleton({ width = '100%', height, radius = 'control' }: SkeletonProps) {
  const opacidade = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const animacao = Animated.loop(
      Animated.sequence([
        Animated.timing(opacidade, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacidade, { toValue: 0.5, duration: 700, useNativeDriver: true }),
      ]),
    );
    animacao.start();
    return () => animacao.stop();
  }, [opacidade]);

  return (
    <Animated.View
      style={{ width, height, opacity: opacidade, backgroundColor: cores.border, borderRadius: raios[radius] }}
    />
  );
}
