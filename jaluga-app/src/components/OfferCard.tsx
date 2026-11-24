import { MapPin, Truck } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { cores } from '../theme/colors';
import type { Oferta, Usuario } from '../types';
import { formatBRL } from '../utils/formatBRL';
import { textoModalidades } from '../utils/modalidades';
import { Card } from './Card';
import { ItemPlaceholder } from './ItemPlaceholder';
import { Rating } from './Rating';

interface OfferCardProps {
  oferta: Oferta;
  ofertante: Usuario | undefined;
  onPress?: () => void;
  selecionada?: boolean;
}

export function OfferCard({ oferta, ofertante, onPress, selecionada = false }: OfferCardProps) {
  return (
    <Card
      onPress={onPress}
      selecionado={selecionada}
      accessibilityLabel={`${oferta.nomeItem}, ${formatBRL(oferta.precoTotal)}, de ${ofertante?.nome ?? 'vizinho'}`}
      className="mb-3"
    >
      <View className="flex-row gap-3">
        <ItemPlaceholder icone={oferta.icone} size={64} />
        <View className="flex-1">
          <Text className="font-title text-title-18 text-primary-900" numberOfLines={2}>
            {oferta.nomeItem}
          </Text>
          <Text className="font-body-medium text-body-14 text-primary-900">{ofertante?.nome}</Text>
          {ofertante ? <Rating nota={ofertante.nota} totalAlugueis={ofertante.totalAlugueis} /> : null}
        </View>
      </View>
      <View className="mt-3 flex-row items-end justify-between">
        <View className="gap-1">
          <View className="flex-row items-center gap-1">
            <MapPin size={14} color={cores.textMuted} />
            <Text className="font-body text-body-12 text-text-muted">
              {oferta.distanciaKm.toFixed(1).replace('.', ',')} km
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Truck size={14} color={cores.textMuted} />
            <Text className="font-body text-body-12 text-text-muted">{textoModalidades(oferta.modalidades)}</Text>
          </View>
        </View>
        <View className="items-end">
          <Text className="font-title-xbold text-title-20 text-primary-900">{formatBRL(oferta.precoTotal)}</Text>
          <Text className="font-body text-body-12 text-text-muted">{formatBRL(oferta.precoPorDia)} por dia</Text>
        </View>
      </View>
    </Card>
  );
}
