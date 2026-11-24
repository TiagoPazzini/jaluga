import { Pressable, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { cores } from '../theme/colors';

interface RaioSelectorProps {
  value: number;
  onChange: (km: number) => void;
  opcoes: number[];
}

// Seletor visual do raio. Não valida limites.
export function RaioSelector({ value, onChange, opcoes }: RaioSelectorProps) {
  const indice = Math.max(0, opcoes.indexOf(value));
  const raioVisual = 20 + (indice / Math.max(1, opcoes.length - 1)) * 50;

  return (
    <View className="mb-4">
      <Text className="mb-2 font-body-medium text-body-14 text-primary-900">Até onde os vizinhos podem estar?</Text>
      <View className="mb-3 items-center rounded-card border border-border bg-white py-3">
        <Svg width={160} height={160} viewBox="0 0 160 160" accessibilityElementsHidden>
          <Circle cx={80} cy={80} r={raioVisual} fill={cores.primary100} stroke={cores.primary300} strokeWidth={2} strokeDasharray="6 4" />
          <Circle cx={80} cy={80} r={8} fill={cores.primary600} />
        </Svg>
        <Text className="font-title text-title-20 text-primary-900">{value} km</Text>
      </View>
      <View className="flex-row gap-2">
        {opcoes.map((km) => {
          const ativo = km === value;
          return (
            <Pressable
              key={km}
              onPress={() => onChange(km)}
              accessibilityRole="button"
              accessibilityLabel={`${km} quilômetros`}
              accessibilityState={{ selected: ativo }}
              className={`min-h-[44px] flex-1 items-center justify-center rounded-pill border ${
                ativo ? 'border-primary-600 bg-primary-600' : 'border-border bg-white'
              }`}
            >
              <Text className={`font-body-semibold text-body-14 ${ativo ? 'text-white' : 'text-primary-900'}`}>{km} km</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
