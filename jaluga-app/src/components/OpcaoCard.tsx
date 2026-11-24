import { CheckCircle2, Circle, type LucideIcon } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { cores } from '../theme/colors';

interface OpcaoCardProps {
  titulo: string;
  descricao?: string;
  selecionada: boolean;
  onPress: () => void;
  icon?: LucideIcon;
}

export function OpcaoCard({ titulo, descricao, selecionada, onPress, icon: Icone }: OpcaoCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="checkbox"
      accessibilityLabel={titulo}
      accessibilityState={{ checked: selecionada }}
      className={`mb-2 min-h-[56px] flex-row items-center gap-3 rounded-card border-2 bg-white px-3 py-3 ${
        selecionada ? 'border-primary-600' : 'border-border'
      }`}
    >
      {Icone ? (
        <View className="h-12 w-12 items-center justify-center rounded-pill bg-primary-100">
          <Icone size={22} color={cores.primary600} />
        </View>
      ) : null}
      <View className="flex-1">
        <Text className="font-body-semibold text-body-16 text-primary-900">{titulo}</Text>
        {descricao ? <Text className="font-body text-body-14 text-text-muted">{descricao}</Text> : null}
      </View>
      {selecionada ? <CheckCircle2 size={24} color={cores.primary600} /> : <Circle size={24} color={cores.primary300} />}
    </Pressable>
  );
}
