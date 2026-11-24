import { Turtle } from 'lucide-react-native';
import { Image } from 'react-native';
import { MASCOTE_IMAGEM } from '../theme/brand';
import { cores } from '../theme/colors';
import { Hexagono } from './Hexagono';

interface MascoteProps {
  size: number;
}

// Use só no onboarding, nas telas de sucesso e nos estados vazios.
export function Mascote({ size }: MascoteProps) {
  if (MASCOTE_IMAGEM) {
    return (
      <Image
        source={MASCOTE_IMAGEM}
        style={{ width: size, height: size }}
        resizeMode="contain"
        accessibilityLabel="Jabuti, mascote do JALUGA"
      />
    );
  }
  // Substituto até o arquivo jabuti.png chegar.
  return (
    <Hexagono size={size} fill={cores.primary100} stroke={cores.primary300}>
      <Turtle size={size * 0.5} color={cores.primary600} accessibilityLabel="Jabuti, mascote do JALUGA" />
    </Hexagono>
  );
}
