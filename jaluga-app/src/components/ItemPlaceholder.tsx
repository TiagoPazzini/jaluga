import {
  Baby,
  Drill,
  Droplets,
  Luggage,
  Package,
  Projector,
  Speaker,
  Tent,
  type LucideIcon,
} from 'lucide-react-native';
import { View } from 'react-native';
import { cores } from '../theme/colors';
import type { IconeItem } from '../types';

const icones: Record<IconeItem, LucideIcon> = {
  furadeira: Drill,
  som: Speaker,
  mala: Luggage,
  cadeirinha: Baby,
  barraca: Tent,
  lavadora: Droplets,
  projetor: Projector,
  generico: Package,
};

interface ItemPlaceholderProps {
  icone: IconeItem;
  size?: number;
}

// Ilustração do item no lugar de foto.
export function ItemPlaceholder({ icone, size = 56 }: ItemPlaceholderProps) {
  const Icone = icones[icone];
  return (
    <View
      style={{ width: size, height: size }}
      className="items-center justify-center rounded-card bg-primary-100"
      accessibilityElementsHidden
      importantForAccessibility="no"
    >
      <Icone size={size * 0.5} color={cores.primary600} />
    </View>
  );
}
