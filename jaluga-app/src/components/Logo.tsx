import { Text } from 'react-native';

interface LogoProps {
  variant: 'claro' | 'escuro'; // cor do fundo onde o logo aparece
  size?: 'sm' | 'md' | 'lg';
}

const tamanhos = { sm: 'text-title-20', md: 'text-title-32', lg: 'text-title-40' };

export function Logo({ variant, size = 'md' }: LogoProps) {
  const ja = variant === 'escuro' ? 'text-accent-400' : 'text-primary-600';
  const luga = variant === 'escuro' ? 'text-white' : 'text-primary-900';
  return (
    <Text className={`font-title-xbold ${tamanhos[size]}`} accessibilityLabel="JALUGA" accessibilityRole="header">
      <Text className={ja}>JA</Text>
      <Text className={luga}>LUGA</Text>
    </Text>
  );
}
