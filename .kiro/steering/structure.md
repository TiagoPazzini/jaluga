# JALUGA: estrutura do projeto

```
jaluga-app/
├── docs/
│   ├── JALUGA-fase1-telas.md           # escopo da Fase 1
│   └── JALUGA-briefing-MVP-mobile.md   # referência completa (usar seções 4 e 5)
├── assets/
│   └── brand/
│       └── jabuti.png                  # mascote (origem: jaluga-mascote-jabuti_2.png)
├── app/                                # rotas do Expo Router (detalhadas no design.md)
├── src/
│   ├── components/                     # Button, Input, RequestCard, OfferCard, ...
│   ├── mocks/                          # usuários, pedidos, ofertas, aluguéis, categorias
│   ├── store/                          # stores Zustand
│   ├── theme/                          # tokens e fontes
│   └── types/                          # tipos TypeScript dos mocks
├── tailwind.config.js
└── package.json
```

## Regras
- Rotas ficam em `app/`. Telas só compõem componentes e leem dados de `src/mocks/` ou das stores.
- Componentes reutilizáveis ficam em `src/components/`, sem dependência de rota.
- Mocks são arquivos TypeScript tipados em `src/mocks/`. Nada de fetch.
- Specs ficam em `.kiro/specs/jaluga-fase1-prototipo/`. Docs do produto ficam em `docs/`.
- Ordem de construção (seção 9 da Fase 1): projeto/tema/fontes/assets, componentes base, navegação, fluxo de pedir, fluxo de ofertar, fluxo do aluguel, perfil e notificações, revisão em 360 e 430 pt.