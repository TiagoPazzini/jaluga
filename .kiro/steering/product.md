# JALUGA: produto

JALUGA ("já aluga") é um app mobile de aluguel de itens entre pessoas (P2P) em Mogi das Cruzes (SP). Slogan: "Você pede. O bairro oferta."

## Demanda invertida
O cliente publica o item que precisa e a data. Os vizinhos que têm o item enviam ofertas. Quem precisa não procura anúncios, e quem tem o item só responde a pedidos reais.

## Fase atual: Fase 1 (protótipo navegável)
- Escopo: as 13 telas da seção 6 de `docs/JALUGA-fase1-telas.md`, o design system e dados simulados locais.
- Fonte de verdade do escopo: `docs/JALUGA-fase1-telas.md`.
- Do briefing completo (`docs/JALUGA-briefing-MVP-mobile.md`), use só a seção 4 (design system) e a seção 5 (telas). As seções 6, 7 e 8 (regras de negócio, máquinas de estado, modelo de dados) são de fases futuras. Não implemente nada delas.
- Se os dois documentos divergirem, vale a Fase 1 (ex.: ordem das abas e botão "+ Pedir" amarelo).

## Fora do escopo da Fase 1
- Backend, API, banco de dados e chamadas de rede.
- Cálculo de preço, comissão, caução, prazos, raio ou validação de estados. Valores exibidos são fixos nos mocks.
- Login, pagamento, chat, contrato, notificações e mapa: só visuais.
- Política de cancelamento: não exibir.
- Taxa de 25%: nos mocks, aparece como "taxa de serviço" somada ao valor do cliente.

## Marca e voz
- Amigável, próxima, de vizinho. Português do Brasil, sempre "você", frases curtas.
- Mascote jabuti (`assets/brand/jabuti.png`): só no onboarding, nas telas de sucesso e nos estados vazios. Nunca em formulários, checkout ou contrato.
- Logo: "JA" em destaque (amarelo sobre fundo escuro, roxo `#6C2BD9` sobre fundo claro) e "LUGA" (branco sobre escuro, `#2A0E5C` sobre claro).
- Cada tela tem uma ação principal clara.