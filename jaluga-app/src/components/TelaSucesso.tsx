import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomActionBar } from './BottomActionBar';
import { Mascote } from './Mascote';

interface TelaSucessoProps {
  titulo: string;
  descricao?: string;
  acoes: ReactNode; // botões, empilhados
}

export function TelaSucesso({ titulo, descricao, acoes }: TelaSucessoProps) {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-primary-50">
      <View className="flex-1 items-center justify-center px-6">
        <Mascote size={180} />
        <Text className="mt-6 text-center font-title-xbold text-title-32 text-primary-900" accessibilityRole="header">
          {titulo}
        </Text>
        {descricao ? <Text className="mt-3 text-center font-body text-body-16 text-text-muted">{descricao}</Text> : null}
      </View>
      <BottomActionBar>
        <View className="flex-1 gap-2">{acoes}</View>
      </BottomActionBar>
    </SafeAreaView>
  );
}
