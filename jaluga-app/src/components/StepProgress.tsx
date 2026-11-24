import { Text, View } from 'react-native';

interface StepProgressProps {
  atual: number; // começa em 1
  total: number;
  rotulo: string;
}

export function StepProgress({ atual, total, rotulo }: StepProgressProps) {
  return (
    <View
      className="mb-6"
      accessibilityRole="progressbar"
      accessibilityLabel={`Passo ${atual} de ${total}: ${rotulo}`}
    >
      <View className="mb-2 flex-row gap-2">
        {Array.from({ length: total }, (_, i) => (
          <View key={i} className={`h-2 flex-1 rounded-pill ${i < atual ? 'bg-primary-600' : 'bg-border'}`} />
        ))}
      </View>
      <Text className="font-body-medium text-body-14 text-text-muted">
        Passo {atual} de {total} · {rotulo}
      </Text>
    </View>
  );
}
