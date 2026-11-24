import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { CategoryChip } from '../../src/components/CategoryChip';
import { Lista } from '../../src/components/Lista';
import { PedidoVizinhoCard } from '../../src/components/PedidoVizinhoCard';
import { Screen } from '../../src/components/Screen';
import { useListaEstado } from '../../src/hooks/useListaEstado';
import { categorias, getPedidosDeVizinhos, getUsuario } from '../../src/mocks';
import type { CategoriaId } from '../../src/types';

export default function Ofertar() {
  const estado = useListaEstado();
  const [filtro, setFiltro] = useState<CategoriaId | null>(null);
  const pedidos = getPedidosDeVizinhos().filter((p) => filtro === null || p.categoriaId === filtro);

  return (
    <Screen>
      <Text className="font-title-xbold text-title-24 text-primary-900" accessibilityRole="header">
        Pedidos perto de você
      </Text>
      <Text className="mb-4 font-body text-body-16 text-text-muted">
        Tem algum desses itens? Faça uma oferta para o vizinho.
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 mb-2" contentContainerStyle={{ paddingHorizontal: 16 }}>
        <CategoryChip rotulo="Todas" selecionada={filtro === null} onPress={() => setFiltro(null)} />
        {categorias.map((c) => (
          <CategoryChip key={c.id} rotulo={c.nome} selecionada={filtro === c.id} onPress={() => setFiltro(c.id)} />
        ))}
      </ScrollView>

      <Lista
        estado={estado}
        dados={pedidos}
        keyExtractor={(p) => p.id}
        renderItem={(p) => (
          <PedidoVizinhoCard pedido={p} dono={getUsuario(p.donoId)} onPress={() => router.push(`/oferta/${p.id}`)} />
        )}
        vazio={{
          titulo: 'Nenhum pedido por perto ainda',
          descricao: 'Compartilhe o JALUGA com seus vizinhos!',
        }}
      />
    </Screen>
  );
}
