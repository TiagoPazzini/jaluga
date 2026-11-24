import { colors as tokens } from './tokens';

// Cores para props que não aceitam className (ícones, SVG).
export const cores = {
  primary50: tokens.primary[50],
  primary100: tokens.primary[100],
  primary300: tokens.primary[300],
  primary600: tokens.primary[600],
  primary700: tokens.primary[700],
  primary900: tokens.primary[900],
  accent400: tokens.accent[400],
  accent700: tokens.accent[700],
  textMuted: tokens['text-muted'],
  border: tokens.border,
  success: tokens.success,
  danger: tokens.danger,
  white: tokens.white,
} as const;

export type Cor = (typeof cores)[keyof typeof cores];
