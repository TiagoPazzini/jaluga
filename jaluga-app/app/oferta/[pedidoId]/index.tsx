import { router, useLocalSearchParams } from 'expo-router';
import { CalendarDays, MapPin } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { Avatar } from '../../../src/components/Avatar';
import { BottomActionBar } from '../../../src/components/BottomActionBar';
import { Button } from '../../../src/components/Button';
import { Card } from '../../../src/components/Card';
import { CategoryChip } from '../../../src/components/CategoryChip';
import { EmptyState } from '../../../src/components/EmptyState';
import { Header } from '../../../src/components/Header';
import { ItemPlaceholder } from '../../../src/components/ItemPlaceholder';
import { MapaIlustrativo } from '../../../src/components/MapaIlustrativo';
import { Rating } from '../../../src/components/Rating';
import { Screen } from '../../../src/components/Screen';
import { usePedido } from '../../../src/hooks/usePedido';
import { getNomeCategoria, getUsuario } from '../../../src/mocks';
import { cores } from '../../../src/theme/colors';

export default function DetalhePedidoParaOfertar() {
  const { pedidoId } = useLocalSearchParams<{ pedidoId: string }>();
  const pedido = usePedido(pedidoId);
  const dono = pedido ? getUsuario(pedido.donoId) : undefined;
  const voltar = () => (router.canGoBack() ? router.back() : router.replace('/ofertar'));

  if (!pedido) {
    return (
      <Screen header={<Header titulo="Pedido" onBack={voltar} />}>
        <EmptyState titulo="Não achamos esse pedido" acao={{ rotulo: 'Voltar', onPress: voltar }} />
      </Screen>
    );
  }

  return (
    <Screen
      header={<Header titulo="Pedido do vizinho" onBack={voltar} />}
      rodape={
        <BottomActionBar>
          <Button title="Fazer uma oferta" onPress={() => router.push(`/oferta/${pedido.id}/enviar`)} />
        </BottomActionBar>
      }
    >
      <View className="mb-4 flex-row items-center gap-4">
        <ItemPlaceholder icone={pedido.icone} size={72} />
        <View className="flex-1">
          <Text className="font-title-xbold text-title-24 text-primary-900" accessibilityRole="header">
            {pedido.titulo}
          </Text>
        </View>
      </View>
      <View className="mb-2 flex-row">
        <CategoryChip rotulo={getNomeCategoria(pedido.categoriaId)} />
      </View>

      <Card className="mb-4">
        {pedido.descricao ? <Text className="mb-3 font-body text-body-16 text-primary-900">{pedido.descricao}</Text> : null}
        <View className="mb-2 flex-row items-center gap-2">
          <CalendarDays size={18} color={cores.primary600} />
          <View>
            <Text className="font-body text-body-12 text-text-muted">Período</Text>
            <Text className="font-body-medium text-body-14 text-primary-900">
              {pedido.inicio} até {pedido.fim}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center gap-2">
          <MapPin size={18} color={cores.primary600} />
          <View>
            <Text className="font-body text-body-12 text-text-muted">Bairro</Text>
            <Text className="font-body-medium text-body-14 text-primary-900">
              {pedido.bairro} · a {pedido.distanciaKm.toFixed(1).replace('.', ',')} km de você
            </Text>
          </View>
        </View>
      </Card>

      {dono ? (
        <Card className="mb-4">
          <Text className="mb-3 font-title text-title-18 text-primary-900">Quem pediu</Text>
          <View className="flex-row items-center gap-3">
            <Avatar nome={dono.nome} size={52} verificado={dono.verificado} />
            <View className="flex-1 gap-1">
              <Text className="font-body-semibold text-body-16 text-primary-900">{dono.nome}</Text>
              <Text className="font-body text-body-14 text-text-muted">{dono.bairro}</Text>
              <Rating nota={dono.nota} totalAlugueis={dono.totalAlugueis} />
            </View>
          </View>
        </Card>
      ) : null}

      <MapaIlustrativo bairro={pedido.bairro} />
    </Screen>
  );
}
