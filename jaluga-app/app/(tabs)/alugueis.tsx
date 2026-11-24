import { Text } from 'react-native';
import { EmptyState } from '../../src/components/EmptyState';
import { Screen } from '../../src/components/Screen';

// Tela 12 ainda não construída nesta entrega.
export default function Alugueis() {
  return (
    <Screen>
      <Text className="font-title-xbold text-title-24 text-primary-900" accessibilityRole="header">
        Aluguéis
      </Text>
      <EmptyState titulo="Em construção" descricao="Seus aluguéis vão aparecer aqui na próxima etapa do protótipo." />
    </Screen>
  );
}
