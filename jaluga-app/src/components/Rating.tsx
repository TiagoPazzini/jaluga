import { Star } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { cores } from '../theme/colors';
import { Hexagono } from './Hexagono';

interface RatingProps {
  nota: number;
  totalAlugueis?: number;
}

// Badge hexagonal de nota.
export function Rating({ nota, totalAlugueis }: RatingProps) {
  const texto = nota.toFixed(1).replace('.', ',');
  return (
    <View
      className="flex-row items-center gap-1"
      accessibilityLabel={`Nota ${texto}${totalAlugueis !== undefined ? `, ${totalAlugueis} aluguéis` : ''}`}
    >
      <Hexagono size={22} fill={cores.accent400}>
        <Star size={11} color={cores.primary900} fill={cores.primary900} />
      </Hexagono>
      <Text className="font-body-semibold text-body-14 text-primary-900">{texto}</Text>
      {totalAlugueis !== undefined ? (
        <Text className="font-body text-body-12 text-text-muted">· {totalAlugueis} aluguéis</Text>
      ) : null}
    </View>
  );
}
