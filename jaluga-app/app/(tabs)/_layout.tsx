import { Tabs, router } from 'expo-router';
import { TabBar } from '../../src/components/TabBar';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={({ state }) => (
        <TabBar
          ativa={state.routes[state.index]?.name ?? 'inicio'}
          onSelecionar={(aba) => router.navigate(`/${aba}`)}
          onPedir={() => router.push('/pedido/novo')}
        />
      )}
    >
      <Tabs.Screen name="inicio" />
      <Tabs.Screen name="ofertar" />
      <Tabs.Screen name="pedir" />
      <Tabs.Screen name="alugueis" />
      <Tabs.Screen name="perfil" />
    </Tabs>
  );
}
