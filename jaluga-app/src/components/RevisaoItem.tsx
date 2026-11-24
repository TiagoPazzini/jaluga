import { Text, View } from 'react-native';
import { Button } from './Button';

interface RevisaoItemProps {
  rotulo: string;
  valor: string;
  onEditar: () => void;
  ultimo?: boolean;
}

// Linha da tela de revisão, com botão para voltar ao passo e editar.
export function RevisaoItem({ rotulo, valor, onEditar, ultimo = false }: RevisaoItemProps) {
  return (
    <View className={`flex-row items-start py-3 ${ultimo ? '' : 'border-b border-border'}`}>
      <View className="flex-1 pr-2">
        <Text className="font-body text-body-12 text-text-muted">{rotulo}</Text>
        <Text className="font-body-medium text-body-16 text-primary-900">{valor}</Text>
      </View>
      <View className="flex-row">
        <Button title="Editar" variant="fantasma" fullWidth={false} onPress={onEditar} accessibilityLabel={`Editar ${rotulo}`} />
      </View>
    </View>
  );
}
