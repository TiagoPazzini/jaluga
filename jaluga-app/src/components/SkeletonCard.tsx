import { View } from 'react-native';
import { Skeleton } from './Skeleton';

// Esqueleto de um card de lista enquanto "carrega".
export function SkeletonCard() {
  return (
    <View
      className="mb-3 rounded-card border-2 border-border bg-white p-4"
      accessibilityLabel="Carregando"
      accessibilityRole="progressbar"
    >
      <View className="flex-row gap-3">
        <Skeleton width={56} height={56} radius="card" />
        <View className="flex-1 gap-2">
          <Skeleton width="80%" height={18} />
          <Skeleton width="50%" height={14} />
        </View>
      </View>
      <View className="mt-3 flex-row justify-between">
        <Skeleton width={80} height={24} radius="pill" />
        <Skeleton width={96} height={18} />
      </View>
    </View>
  );
}
