import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenProps {
  children: ReactNode;
  header?: ReactNode;
  rodape?: ReactNode; // normalmente uma BottomActionBar
  scroll?: boolean;
  semMargem?: boolean;
}

// Base de todas as telas: área segura, fundo primary-50, margem lateral de 16 pt
// e rodapé fixo embaixo.
export function Screen({ children, header, rodape, scroll = true, semMargem = false }: ScreenProps) {
  const conteudo = <View className={`${semMargem ? '' : 'px-4'} pb-6 pt-4`}>{children}</View>;

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-primary-50">
      {header}
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {scroll ? (
          <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
            {conteudo}
          </ScrollView>
        ) : (
          <View className="flex-1">{conteudo}</View>
        )}
        {rodape}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
