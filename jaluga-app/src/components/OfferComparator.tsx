import { Check, Minus } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { cores } from '../theme/colors';
import type { Oferta, Usuario } from '../types';
import { formatBRL } from '../utils/formatBRL';
import { ItemPlaceholder } from './ItemPlaceholder';

interface OfferComparatorProps {
  ofertas: { oferta: Oferta; ofertante: Usuario | undefined }[];
  selecionadaId: string | null;
  onSelecionar: (ofertaId: string) => void;
}

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <View className="border-t border-border py-2">
      <Text className="font-body text-body-12 text-text-muted">{rotulo}</Text>
      <Text className="font-body-semibold text-body-14 text-primary-900">{valor}</Text>
    </View>
  );
}

function Sim({ rotulo, ativo }: { rotulo: string; ativo: boolean }) {
  return (
    <View className="flex-row items-center gap-1 py-1">
      {ativo ? <Check size={16} color={cores.success} /> : <Minus size={16} color={cores.textMuted} />}
      <Text className={`font-body text-body-12 ${ativo ? 'text-primary-900' : 'text-text-muted'}`}>{rotulo}</Text>
    </View>
  );
}

// Ofertas lado a lado.
export function OfferComparator({ ofertas, selecionadaId, onSelecionar }: OfferComparatorProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingRight: 16 }}>
      {ofertas.map(({ oferta, ofertante }) => {
        const ativa = oferta.id === selecionadaId;
        return (
          <Pressable
            key={oferta.id}
            onPress={() => onSelecionar(oferta.id)}
            accessibilityRole="button"
            accessibilityLabel={`Escolher ${oferta.nomeItem}, ${formatBRL(oferta.precoTotal)}`}
            accessibilityState={{ selected: ativa }}
            style={{ width: 156 }}
            className={`rounded-card border-2 bg-white p-3 ${ativa ? 'border-primary-600' : 'border-border'}`}
          >
            <ItemPlaceholder icone={oferta.icone} size={48} />
            <Text className="mt-2 font-title text-title-18 text-primary-900" numberOfLines={2}>
              {oferta.nomeItem}
            </Text>
            <Text className="mb-1 font-body text-body-12 text-text-muted" numberOfLines={1}>
              {ofertante?.nome}
            </Text>
            <Linha rotulo="Preço total" valor={formatBRL(oferta.precoTotal)} />
            <Linha rotulo="Por dia" valor={formatBRL(oferta.precoPorDia)} />
            <Linha rotulo="Nota" valor={ofertante ? ofertante.nota.toFixed(1).replace('.', ',') : '-'} />
            <Linha rotulo="Aluguéis" valor={ofertante ? String(ofertante.totalAlugueis) : '-'} />
            <Linha rotulo="Distância" valor={`${oferta.distanciaKm.toFixed(1).replace('.', ',')} km`} />
            <View className="border-t border-border pt-2">
              <Sim rotulo="Entrega" ativo={oferta.modalidades.includes('entrega')} />
              <Sim rotulo="Retirada" ativo={oferta.modalidades.includes('retirada')} />
            </View>
            <View
              className={`mt-2 min-h-[44px] items-center justify-center rounded-control ${
                ativa ? 'bg-primary-600' : 'bg-primary-100'
              }`}
            >
              <Text className={`font-body-semibold text-body-14 ${ativa ? 'text-white' : 'text-primary-600'}`}>
                {ativa ? 'Escolhida' : 'Escolher'}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
