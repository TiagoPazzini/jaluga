import { router, useLocalSearchParams } from 'expo-router';
import { CalendarDays, MapPin } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { BottomActionBar } from '../../src/components/BottomActionBar';
import { Button } from '../../src/components/Button';
import { Card } from '../../src/components/Card';
import { EmptyState } from '../../src/components/EmptyState';
import { FeedbackToast } from '../../src/components/FeedbackToast';
import { Header } from '../../src/components/Header';
import { ItemPlaceholder } from '../../src/components/ItemPlaceholder';
import { Lista } from '../../src/components/Lista';
import { OfferCard } from '../../src/components/OfferCard';
import { OfferComparator } from '../../src/components/OfferComparator';
import { Screen } from '../../src/components/Screen';
import { SegmentedControl } from '../../src/components/SegmentedControl';
import { StatusBadge } from '../../src/components/StatusBadge';
import { useListaEstado } from '../../src/hooks/useListaEstado';
import { usePedido } from '../../src/hooks/usePedido';
import { getNomeCategoria, getOfertasDoPedido, getUsuario } from '../../src/mocks';
import { cores } from '../../src/theme/colors';

type Vista = 'lista' | 'comparar';

export default function DetalheMeuPedido() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pedido = usePedido(id);
  const estado = useListaEstado();
  const [vista, setVista] = useState<Vista>('lista');
  const [selecionada, setSelecionada] = useState<string | null>(null);
  const [toast, setToast] = useState(false);
  const fecharToast = useCallback(() => setToast(false), []);

  const voltar = () => (router.canGoBack() ? router.back() : router.replace('/inicio'));

  if (!pedido) {
    return (
      <Screen header={<Header titulo="Meu pedido" onBack={voltar} />}>
        <EmptyState titulo="Não achamos esse pedido" acao={{ rotulo: 'Voltar', onPress: voltar }} />
      </Screen>
    );
  }

  const ofertas = getOfertasDoPedido(pedido.id).map((oferta) => ({ oferta, ofertante: getUsuario(oferta.ofertanteId) }));
  const temOfertas = estado === 'dados' && ofertas.length > 0;

  return (
    <View className="flex-1">
      <Screen
        header={<Header titulo="Meu pedido" onBack={voltar} />}
        rodape={
          temOfertas ? (
            <BottomActionBar>
              <Button
                title={selecionada ? 'Aceitar oferta' : 'Escolha uma oferta'}
                disabled={!selecionada}
                onPress={() => setToast(true)}
              />
            </BottomActionBar>
          ) : undefined
        }
      >
        <Card className="mb-6">
          <View className="flex-row gap-3">
            <ItemPlaceholder icone={pedido.icone} size={64} />
            <View className="flex-1">
              <Text className="font-title text-title-20 text-primary-900">{pedido.titulo}</Text>
              <Text className="font-body text-body-14 text-text-muted">{getNomeCategoria(pedido.categoriaId)}</Text>
            </View>
          </View>
          {pedido.descricao ? <Text className="mt-3 font-body text-body-16 text-primary-900">{pedido.descricao}</Text> : null}
          <View className="mt-3 gap-1">
            <View className="flex-row items-center gap-2">
              <CalendarDays size={16} color={cores.textMuted} />
              <Text className="font-body text-body-14 text-text-muted">
                {pedido.inicio} até {pedido.fim}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <MapPin size={16} color={cores.textMuted} />
              <Text className="font-body text-body-14 text-text-muted">
                {pedido.bairro} · até {pedido.raioKm} km
              </Text>
            </View>
          </View>
          <View className="mt-3">
            <StatusBadge status={pedido.status} />
          </View>
        </Card>

        <Text className="mb-3 font-title text-title-20 text-primary-900" accessibilityRole="header">
          Ofertas recebidas {temOfertas ? `(${ofertas.length})` : ''}
        </Text>

        {temOfertas ? (
          <SegmentedControl
            opcoes={[
              { value: 'lista', label: 'Lista' },
              { value: 'comparar', label: 'Comparar' },
            ]}
            value={vista}
            onChange={setVista}
          />
        ) : null}

        {temOfertas && vista === 'comparar' ? (
          <View className="-mr-4">
            <OfferComparator ofertas={ofertas} selecionadaId={selecionada} onSelecionar={setSelecionada} />
          </View>
        ) : (
          <Lista
            estado={estado}
            dados={ofertas}
            keyExtractor={(o) => o.oferta.id}
            renderItem={({ oferta, ofertante }) => (
              <OfferCard
                oferta={oferta}
                ofertante={ofertante}
                selecionada={selecionada === oferta.id}
                onPress={() => setSelecionada(oferta.id)}
              />
            )}
            vazio={{
              titulo: 'Seu pedido está no ar',
              descricao: 'Avisamos você quando chegar a primeira oferta.',
            }}
          />
        )}
      </Screen>
      <FeedbackToast
        visivel={toast}
        onFechar={fecharToast}
        mensagem="O checkout chega na próxima etapa do protótipo."
      />
    </View>
  );
}
