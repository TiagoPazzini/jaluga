import { CalendarDays, MessageSquareText } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { cores } from '../theme/colors';
import type { Pedido } from '../types';
import { Card } from './Card';
import { ItemPlaceholder } from './ItemPlaceholder';
import { StatusBadge } from './StatusBadge';

interface RequestCardProps {
  pedido: Pedido;
  quantidadeOfertas: number;
  onPress: () => void;
}

// Card de "Meus pedidos".
export function RequestCard({ pedido, quantidadeOfertas, onPress }: RequestCardProps) {
  const ofertasTexto =
    quantidadeOfertas === 0 ? 'Nenhuma oferta ainda' : quantidadeOfertas === 1 ? '1 oferta' : `${quantidadeOfertas} ofertas`;

  return (
    <Card onPress={onPress} accessibilityLabel={`${pedido.titulo}. ${ofertasTexto}`} className="mb-3">
      <View className="flex-row gap-3">
        <ItemPlaceholder icone={pedido.icone} size={56} />
        <View className="flex-1">
          <Text className="font-title text-title-18 text-primary-900" numberOfLines={2}>
            {pedido.titulo}
          </Text>
          <View className="mt-1 flex-row items-center gap-1">
            <CalendarDays size={14} color={cores.textMuted} />
            <Text className="font-body text-body-12 text-text-muted">{pedido.inicio}</Text>
          </View>
        </View>
      </View>
      <View className="mt-3 flex-row items-center justify-between">
        <StatusBadge status={pedido.status} />
        <View className="flex-row items-center gap-1">
          <MessageSquareText size={16} color={cores.primary600} />
          <Text className="font-body-semibold text-body-14 text-primary-600">{ofertasTexto}</Text>
        </View>
      </View>
    </Card>
  );
}
