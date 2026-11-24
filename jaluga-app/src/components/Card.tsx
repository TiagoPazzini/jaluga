import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { shadowCard } from '../theme/shadow';

interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
  selecionado?: boolean;
  className?: string;
}

// Card branco com raio de 12 pt, borda e sombra do tema.
export function Card({ children, onPress, accessibilityLabel, selecionado = false, className = '' }: CardProps) {
  const estilo = `rounded-card border-2 bg-white p-4 ${selecionado ? 'border-primary-600' : 'border-border'} ${className}`;
  if (!onPress) {
    return (
      <View className={estilo} style={shadowCard}>
        {children}
      </View>
    );
  }
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected: selecionado }}
      className={`${estilo} active:opacity-80`}
      style={shadowCard}
    >
      {children}
    </Pressable>
  );
}
