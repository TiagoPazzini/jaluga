# JALUGA: stack e convenções técnicas

## Stack obrigatória
- React Native + Expo, TypeScript (strict). Deve rodar no Expo Go, iOS e Android.
- Expo Router para navegação.
- NativeWind com tokens no `tailwind.config`.
- Fontes: Nunito (títulos, 700/800) e Inter (texto, 400/500/600) via `@expo-google-fonts`.
- Ícones: `lucide-react-native`.
- Estado local: Zustand. Dados só em memória (somem ao fechar o app).

## Restrições
- Nenhuma chamada de rede. Todos os dados vêm de `src/mocks/`.
- Sem regras de negócio. Validação só visual e de campo obrigatório.
- Só dependências compatíveis com Expo Go (sem código nativo customizado).
- Upload de fotos pode abrir a galeria, mas não envia nada. Compartilhar usa o share sheet do celular com texto fixo.

## Design system (seção 4 do briefing)
Cores permitidas, e nenhuma outra:
`primary-50 #F8F5FF` · `primary-100 #EDE4FF` · `primary-300 #B394F0` · `primary-600 #6C2BD9` · `primary-700 #5A22B8` · `primary-900 #2A0E5C` · `accent-400 #FFC93C` · `accent-700 #C98A00` · `text-muted #6E6090` · `border #E3D8FA` · `success #1F9D55` · `danger #D64545` · `white #FFFFFF`.

- O amarelo `#FFC93C` nunca é cor de texto sobre fundo claro. Use como fundo com texto `primary-900`, ou como texto sobre `primary-900`/`primary-600`.
- Raio: 12 pt em cards, 8 pt em botões e inputs, pílula (999) em chips e badges.
- Espaçamento base de 4 pt (4, 8, 12, 16, 24, 32, 48). Margem lateral de 16 pt.
- Escala de fonte: 12/14/16/18/20/24/32/40. Linha 1,5 no corpo e 1,2 nos títulos.
- Sombra: `#2A0E5C` a 8%, offset 2, blur 8 (Android `elevation: 2`).
- Hexágono como motivo (badge de nota, avatar padrão, indicador de carregamento). Linha de rota tracejada em `primary-300` na linha do tempo.

## Acessibilidade
- Contraste WCAG 2.1 AA.
- Áreas de toque de no mínimo 44 × 44 pt.
- Respeitar áreas seguras (`react-native-safe-area-context`). Botões principais ficam fixos embaixo, acima da área segura.
- Projetar para larguras de 360 a 430 pt, em retrato.
- `accessibilityLabel` e `accessibilityRole` em elementos interativos.

## Convenções de código
- Componentes funcionais, props tipadas, um componente por arquivo, nome em PascalCase.
- Estilos com classes NativeWind e tokens do tema. Sem cores hex soltas no código.
- Textos de interface em português do Brasil.
- Cada lista suporta três estados: dados, vazio (com mascote) e carregando (skeleton). Alternância via opção oculta no Perfil.