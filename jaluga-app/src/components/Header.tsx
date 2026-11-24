import { ChevronLeft } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { cores } from '../theme/colors';

interface HeaderProps {
  titulo?: string;
  onBack?: () => void;
  acaoDireita?: ReactNode;
}

export function Header({ titulo, onBack, acaoDireita }: HeaderProps) {
  return (
    <View className="min-h-[56px] flex-row items-center border-b border-border bg-white px-2">
      {onBack ? (
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          className="min-h-[44px] min-w-[44px] items-center justify-center rounded-control"
        >
          <ChevronLeft size={26} color={cores.primary900} />
        </Pressable>
      ) : (
        <View className="min-w-[44px]" />
      )}
      <Text
        className="flex-1 text-center font-title text-title-18 text-primary-900"
        numberOfLines={1}
        accessibilityRole="header"
      >
        {titulo}
      </Text>
      <View className="min-w-[44px] items-center justify-center">{acaoDireita}</View>
    </View>
  );
}
