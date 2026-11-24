import { House, Plus, Repeat, Search, UserRound, type LucideIcon } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cores } from '../theme/colors';
import { shadowCard } from '../theme/shadow';

export type AbaId = 'inicio' | 'ofertar' | 'alugueis' | 'perfil';

interface TabBarProps {
  ativa: string;
  onSelecionar: (aba: AbaId) => void;
  onPedir: () => void;
}

const abasEsquerda: { id: AbaId; rotulo: string; icone: LucideIcon }[] = [
  { id: 'inicio', rotulo: 'Início', icone: House },
  { id: 'ofertar', rotulo: 'Ofertar', icone: Search },
];
const abasDireita: { id: AbaId; rotulo: string; icone: LucideIcon }[] = [
  { id: 'alugueis', rotulo: 'Aluguéis', icone: Repeat },
  { id: 'perfil', rotulo: 'Perfil', icone: UserRound },
];

// Barra de abas: Início · Ofertar · [+ Pedir] · Aluguéis · Perfil.
export function TabBar({ ativa, onSelecionar, onPedir }: TabBarProps) {
  const insets = useSafeAreaInsets();

  function renderAba({ id, rotulo, icone: Icone }: { id: AbaId; rotulo: string; icone: LucideIcon }) {
    const selecionada = ativa === id;
    const cor = selecionada ? cores.primary600 : cores.textMuted;
    return (
      <Pressable
        key={id}
        onPress={() => onSelecionar(id)}
        accessibilityRole="tab"
        accessibilityLabel={rotulo}
        accessibilityState={{ selected: selecionada }}
        className="min-h-[48px] flex-1 items-center justify-center"
      >
        <Icone size={24} color={cor} />
        <Text className={`mt-1 text-body-12 ${selecionada ? 'font-body-semibold text-primary-600' : 'font-body text-text-muted'}`}>
          {rotulo}
        </Text>
      </Pressable>
    );
  }

  return (
    <View
      className="flex-row items-center border-t border-border bg-white px-2 pt-2"
      style={[shadowCard, { paddingBottom: Math.max(insets.bottom, 8) }]}
      accessibilityRole="tablist"
    >
      {abasEsquerda.map(renderAba)}
      <View className="flex-1 items-center">
        <Pressable
          onPress={onPedir}
          accessibilityRole="button"
          accessibilityLabel="Pedir um item"
          className="-mt-6 h-16 w-16 items-center justify-center rounded-pill border-4 border-white bg-accent-400"
          style={shadowCard}
        >
          <Plus size={30} color={cores.primary900} strokeWidth={3} />
        </Pressable>
        <Text className="mt-1 font-body-semibold text-body-12 text-primary-900">Pedir</Text>
      </View>
      {abasDireita.map(renderAba)}
    </View>
  );
}
