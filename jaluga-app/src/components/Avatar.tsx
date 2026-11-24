import { BadgeCheck } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { cores } from '../theme/colors';
import { Hexagono } from './Hexagono';

interface AvatarProps {
  nome: string;
  size?: number;
  verificado?: boolean;
}

function iniciais(nome: string): string {
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}

// Avatar padrão hexagonal com iniciais e selo de verificado.
export function Avatar({ nome, size = 48, verificado = false }: AvatarProps) {
  return (
    <View
      style={{ width: size, height: size }}
      accessibilityLabel={verificado ? `${nome}, verificado` : nome}
    >
      <Hexagono size={size} fill={cores.primary600}>
        <Text className="font-title-xbold text-white" style={{ fontSize: Math.round(size * 0.36) }}>
          {iniciais(nome)}
        </Text>
      </Hexagono>
      {verificado ? (
        <View className="absolute -bottom-1 -right-1 rounded-pill bg-white p-0.5">
          <BadgeCheck size={Math.max(16, size * 0.34)} color={cores.success} />
        </View>
      ) : null}
    </View>
  );
}
