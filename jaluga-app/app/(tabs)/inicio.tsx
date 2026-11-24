import { router } from 'expo-router';
import { ChevronRight, Plus } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { Lista } from '../../src/components/Lista';
import { Logo } from '../../src/components/Logo';
import { RequestCard } from '../../src/components/RequestCard';
import { Screen } from '../../src/components/Screen';
import { useListaEstado } from '../../src/hooks/useListaEstado';
import { getMeusPedidosMock, getOfertasDoPedido } from '../../src/mocks';
import { usePedidosStore } from '../../src/store/pedidosStore';
import { cores } from '../../src/theme/colors';
import { shadowCard } from '../../src/theme/shadow';

export default function Inicio() {
  const estado = useListaEstado();
  const criados = usePedidosStore((s) => s.pedidosCriados);
  const meusPedidos = [...criados, ...getMeusPedidosMock()];

  return (
    <Screen>
      <View className="mb-4 flex-row items-center justify-between">
        <Logo variant="claro" size="sm" />
      </View>
      <Text className="font-title-xbold text-title-24 text-primary-900" accessibilityRole="header">
        Oi, Tiago!
      </Text>
      <Text className="mb-4 font-body text-body-16 text-text-muted">Você pede. O bairro oferta.</Text>

      <Pressable
        onPress={() => router.push('/pedido/novo')}
        accessibilityRole="button"
        accessibilityLabel="O que você precisa hoje? Pedir um item"
        className="mb-6 flex-row items-center gap-4 rounded-card bg-primary-600 p-4 active:bg-primary-700"
        style={shadowCard}
      >
        <View className="h-12 w-12 items-center justify-center rounded-pill bg-accent-400">
          <Plus size={28} color={cores.primary900} strokeWidth={3} />
        </View>
        <View className="flex-1">
          <Text className="font-title text-title-20 text-white">O que você precisa hoje?</Text>
          <Text className="font-body text-body-14 text-primary-100">Peça uma vez. Os vizinhos ofertam.</Text>
        </View>
        <ChevronRight size={24} color={cores.white} />
      </Pressable>

      <Text className="mb-3 font-title text-title-20 text-primary-900" accessibilityRole="header">
        Meus pedidos
      </Text>
      <Lista
        estado={estado}
        dados={meusPedidos}
        keyExtractor={(p) => p.id}
        renderItem={(p) => (
          <RequestCard
            pedido={p}
            quantidadeOfertas={getOfertasDoPedido(p.id).length}
            onPress={() => router.push(`/pedido/${p.id}`)}
          />
        )}
        vazio={{
          titulo: 'Você ainda não pediu nada',
          descricao: 'Conte o que você precisa e os vizinhos mandam ofertas.',
          acao: { rotulo: 'Pedir um item', onPress: () => router.push('/pedido/novo') },
        }}
      />
    </Screen>
  );
}
