import { Pressable, Text } from 'react-native';

interface CategoryChipProps {
  rotulo: string;
  selecionada?: boolean;
  onPress?: () => void;
}

export function CategoryChip({ rotulo, selecionada = false, onPress }: CategoryChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={rotulo}
      accessibilityState={{ selected: selecionada }}
      className={`mb-2 mr-2 min-h-[44px] justify-center rounded-pill border px-4 ${
        selecionada ? 'border-primary-600 bg-primary-600' : 'border-border bg-primary-100'
      }`}
    >
      <Text className={`font-body-medium text-body-14 ${selecionada ? 'text-white' : 'text-primary-900'}`}>
        {rotulo}
      </Text>
    </Pressable>
  );
}
