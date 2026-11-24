import { Text } from 'react-native';
import { EmptyState } from '../../src/components/EmptyState';
import { Screen } from '../../src/components/Screen';

// Tela 13 ainda não construída nesta entrega.
export default function Perfil() {
  return (
    <Screen>
      <Text className="font-title-xbold text-title-24 text-primary-900" accessibilityRole="header">
        Perfil
      </Text>
      <EmptyState titulo="Em construção" descricao="Seu perfil vai aparecer aqui na próxima etapa do protótipo." />
    </Screen>
  );
}
