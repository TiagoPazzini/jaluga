// Fonte única dos tokens do JALUGA (seção 4 do briefing).
// Este é o ÚNICO arquivo do app com valores hexadecimais.

// Cores da Paleta. Nenhuma outra é permitida.
const colors = {
  transparent: 'transparent',
  primary: {
    50: '#F8F5FF',
    100: '#EDE4FF',
    300: '#B394F0',
    600: '#6C2BD9',
    700: '#5A22B8',
    900: '#2A0E5C',
  },
  accent: {
    400: '#FFC93C',
    700: '#C98A00',
  },
  'text-muted': '#6E6090',
  border: '#E3D8FA',
  success: '#1F9D55',
  danger: '#D64545',
  white: '#FFFFFF',
};

// Títulos: Nunito 700/800. Texto: Inter 400/500/600.
const fontFamily = {
  title: ['Nunito_700Bold'],
  'title-xbold': ['Nunito_800ExtraBold'],
  body: ['Inter_400Regular'],
  'body-medium': ['Inter_500Medium'],
  'body-semibold': ['Inter_600SemiBold'],
};

// Escala 12/14/16/18/20/24/32/40. Corpo com linha 1,5. Títulos com linha 1,2.
const fontSize = {
  'body-12': ['12px', { lineHeight: '18px' }],
  'body-14': ['14px', { lineHeight: '21px' }],
  'body-16': ['16px', { lineHeight: '24px' }],
  'body-18': ['18px', { lineHeight: '27px' }],
  'title-18': ['18px', { lineHeight: '22px' }],
  'title-20': ['20px', { lineHeight: '24px' }],
  'title-24': ['24px', { lineHeight: '29px' }],
  'title-32': ['32px', { lineHeight: '38px' }],
  'title-40': ['40px', { lineHeight: '48px' }],
};

// Base de 4 pt.
const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  6: '24px',
  8: '32px',
  12: '48px',
};

const borderRadius = {
  none: '0px',
  card: '12px',
  control: '8px',
  pill: '999px',
};

const shadow = {
  color: '#2A0E5C',
  opacity: 0.08,
  offset: { width: 0, height: 2 },
  radius: 8,
  elevation: 2,
};

module.exports = { colors, fontFamily, fontSize, spacing, borderRadius, shadow };
