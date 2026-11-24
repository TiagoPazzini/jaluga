import { Text, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { cores } from '../theme/colors';

interface MapaIlustrativoProps {
  bairro: string;
}

// Mapa ilustrativo estático. Não usa localização real.
export function MapaIlustrativo({ bairro }: MapaIlustrativoProps) {
  return (
    <View
      className="overflow-hidden rounded-card border border-border bg-primary-100"
      accessibilityLabel={`Mapa ilustrativo da região de ${bairro}`}
      accessibilityRole="image"
    >
      <Svg width="100%" height={160} viewBox="0 0 320 160" preserveAspectRatio="xMidYMid slice">
        <Rect x={0} y={0} width={320} height={160} fill={cores.primary100} />
        <Path d="M0 50 H320 M0 115 H320 M70 0 V160 M190 0 V160 M260 0 V160" stroke={cores.white} strokeWidth={10} />
        <Path d="M0 160 L120 0" stroke={cores.white} strokeWidth={6} />
        <Circle cx={160} cy={80} r={56} fill={cores.primary300} fillOpacity={0.35} stroke={cores.primary300} strokeWidth={2} strokeDasharray="6 4" />
        <Circle cx={160} cy={80} r={10} fill={cores.primary600} stroke={cores.white} strokeWidth={3} />
      </Svg>
      <View className="bg-white px-3 py-2">
        <Text className="font-body-medium text-body-14 text-primary-900">Região aproximada: {bairro}</Text>
        <Text className="font-body text-body-12 text-text-muted">O endereço exato não aparece aqui.</Text>
      </View>
    </View>
  );
}
