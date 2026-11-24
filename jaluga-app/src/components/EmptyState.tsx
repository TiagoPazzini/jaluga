import { Text, View } from 'react-native';
import { Button } from './Button';
import { Mascote } from './Mascote';

export interface EmptyStateProps {
  titulo: string;
  descricao?: string;
  acao?: { rotulo: string; onPress: () => void };
}

export function EmptyState({ titulo, descricao, acao }: EmptyStateProps) {
  return (
    <View className="items-center px-4 py-8">
      <Mascote size={120} />
      <Text className="mt-4 text-center font-title text-title-20 text-primary-900">{titulo}</Text>
      {descricao ? <Text className="mt-2 text-center font-body text-body-16 text-text-muted">{descricao}</Text> : null}
      {acao ? (
        <View className="mt-6 w-full flex-row">
          <Button title={acao.rotulo} onPress={acao.onPress} variant="secundario" />
        </View>
      ) : null}
    </View>
  );
}
