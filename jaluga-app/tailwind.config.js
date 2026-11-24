const { colors, fontFamily, fontSize, borderRadius } = require('./src/theme/tokens');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    // Substitui a paleta padrão do Tailwind: só as cores da Paleta existem.
    colors,
    fontFamily,
    fontSize,
    // Espaçamento: a escala padrão do Tailwind já é de 4 pt (1 = 4, 2 = 8, 3 = 12, 4 = 16, 6 = 24, 8 = 32, 12 = 48).
    // Use só esses passos nas margens e espaçamentos. A margem lateral das telas é px-4 (16 pt).
    borderRadius,
    extend: {},
  },
  plugins: [],
};
