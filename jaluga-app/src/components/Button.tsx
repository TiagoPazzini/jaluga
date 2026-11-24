import type { LucideIcon } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { cores } from '../theme/colors';

type Variante = 'primario' | 'secundario' | 'fantasma' | 'perigo';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: Variante;
  disabled?: boolean;
  icon?: LucideIcon;
  fullWidth?: boolean;
  accessibilityLabel?: string;
}

const estilos: Record<Variante, { base: string; pressionado: string; texto: string; icone: string }> = {
  primario: {
    base: 'bg-primary-600',
    pressionado: 'bg-primary-700',
    texto: 'text-white',
    icone: cores.white,
  },
  secundario: {
    base: 'bg-white border border-primary-600',
    pressionado: 'bg-primary-100 border border-primary-600',
    texto: 'text-primary-600',
    icone: cores.primary600,
  },
  fantasma: {
    base: 'bg-transparent',
    pressionado: 'bg-primary-100',
    texto: 'text-primary-600',
    icone: cores.primary600,
  },
  perigo: {
    base: 'bg-danger',
    pressionado: 'bg-danger opacity-80',
    texto: 'text-white',
    icone: cores.white,
  },
};

export function Button({
  title,
  onPress,
  variant = 'primario',
  disabled = false,
  icon: Icone,
  fullWidth = true,
  accessibilityLabel,
}: ButtonProps) {
  const e = estilos[variant];
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled }}
      className={fullWidth ? 'flex-1' : ''}
    >
      {({ pressed }) => (
        <View
          className={`min-h-[48px] flex-row items-center justify-center gap-2 rounded-control px-4 ${
            disabled ? 'bg-primary-300' : pressed ? e.pressionado : e.base
          }`}
        >
          {Icone ? <Icone size={20} color={disabled ? cores.white : e.icone} /> : null}
          <Text
            className={`font-body-semibold text-body-16 ${disabled ? 'text-white' : e.texto}`}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
