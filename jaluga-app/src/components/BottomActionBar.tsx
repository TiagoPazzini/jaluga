import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomActionBarProps {
  children: ReactNode;
}

// Barra com a ação principal, fixa embaixo e acima da área segura.
export function BottomActionBar({ children }: BottomActionBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-row gap-3 border-t border-border bg-white px-4 pt-3"
      style={{ paddingBottom: Math.max(insets.bottom, 12) }}
    >
      {children}
    </View>
  );
}
