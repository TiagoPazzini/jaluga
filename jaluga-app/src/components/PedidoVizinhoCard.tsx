import { CalendarDays, MapPin } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { cores } from '../theme/colors';
import type { Pedido, Usuario } from '../types';
import { Avatar } from './Avatar';
import { Card } from './Card';
import { ItemPlaceholder } from './ItemPlaceholder';

interface PedidoVizinhoCardProps {
  pedido: Pedido;
  dono: Usuario | undefined;
  onPress: () => void;
}

function km(valor: number): string {
  return `${valor.toFixed(1).replace('.', ',')} km`;
}

// Card da lista "Pedidos perto de mim".
export function PedidoVizinhoCard({ pedido, dono, onPress }: PedidoVizinhoCardProps) {
  return (
    <Card
      onPress={onPress}
      accessibilityLabel={`${pedido.titulo}, ${pedido.bairro}, a ${km(pedido.distanciaKm)}`}
      className="mb-3"
    >
      <View className="flex-row gap-3">
        <ItemPlaceholder icone={pedido.icone} size={56} />
        <View className="flex-1">
          <Text className="font-title text-title-18 text-primary-900" numberOfLines={2}>
            {pedido.titulo}
          </Text>
          <View className="mt-1 flex-row items-center gap-1">
            <MapPin size={14} color={cores.textMuted} />
            <Text className="font-body text-body-12 text-text-muted">
              {pedido.bairro} · {km(pedido.distanciaKm)}
            </Text>
          </View>
          <View className="mt-1 flex-row items-center gap-1">
            <CalendarDays size={14} color={cores.textMuted} />
            <Text className="font-body text-body-12 text-text-muted">{pedido.inicio}</Text>
          </View>
        </View>
      </View>
      {dono ? (
        <View className="mt-3 flex-row items-center gap-2 border-t border-border pt-3">
          <Avatar nome={dono.nome} size={28} verificado={dono.verificado} />
          <Text className="font-body-medium text-body-14 text-primary-900">{dono.nome}</Text>
        </View>
      ) : null}
    </Card>
  );
}
