# Requirements Document

## Introdução

JALUGA ("já aluga") é um app mobile de aluguel de itens entre pessoas (P2P) em Mogi das Cruzes (SP). O diferencial é a **demanda invertida**: o Cliente publica o item que precisa e a data, e os vizinhos que têm o item enviam ofertas.

Esta spec cobre a **Fase 1**: um **protótipo navegável** em React Native + Expo (TypeScript), com as 13 telas definidas em `docs/JALUGA-fase1-telas.md` (seção 6), o design system aplicado (seção 4 do briefing) e dados simulados locais. O objetivo é ver e testar o visual e a navegação num celular real (Expo Go, iOS e Android), validar os fluxos com pessoas e deixar prontos o design system e os componentes para as próximas fases.

Nesta fase não existem backend, API, banco de dados, chamadas de rede nem regras de negócio. Os valores exibidos são fixos e vêm de `src/mocks/`. O que o usuário cria durante o uso fica só em memória.

**Fontes:** `docs/JALUGA-fase1-telas.md` define o escopo. Do briefing (`docs/JALUGA-briefing-MVP-mobile.md`) valem apenas as seções 4 (design system) e 5 (telas). Quando os dois documentos divergem, a Fase 1 prevalece (ordem das abas e cor do botão "+ Pedir").

## Glossário

- **App_Mobile**: Protótipo do app JALUGA executado no Expo Go (iOS e Android).
- **Cliente**: Pessoa que pede um item (locatário). Nos mocks, o usuário logado é "Tiago".
- **Ofertante**: Pessoa que responde a um Pedido com uma Oferta (locador).
- **Pedido**: Demanda do Cliente, com título, categoria, descrição, período e local.
- **Oferta**: Resposta de um Ofertante a um Pedido, com item, preço total e entrega ou retirada.
- **Aluguel**: Item alugado após uma Oferta aceita, com etapa atual na linha do tempo.
- **Mock**: Dado fixo e tipado guardado em `src/mocks/`.
- **Tokens_Tema**: Cores, fontes, raios, espaçamentos e sombra definidos no `tailwind.config`.
- **Paleta**: As cores da seção 4.3 do briefing: `primary-50`, `primary-100`, `primary-300`, `primary-600`, `primary-700`, `primary-900`, `accent-400`, `accent-700`, `text-muted`, `border`, `success`, `danger` e `white`.
- **Estado_De_Lista**: Um de três modos de exibição de uma lista: dados, vazio ou carregando.
- **Mascote**: Jabuti da marca, em `assets/brand/jabuti.png`.
- **Hexágono**: Motivo visual do casco do jabuti.
- **Area_Segura**: Região da tela livre de notch e barra de gestos.
- **Modo_Teste**: Opção oculta no Perfil que alterna o Estado_De_Lista das telas.

## Requirements

### Requirement 1: Design system e tema

**User Story:** Como pessoa que testa o app, quero ver uma identidade visual consistente, para que o JALUGA pareça amigável e confiável em todas as telas.

#### Acceptance Criteria

1. THE App_Mobile SHALL definir no `tailwind.config` os Tokens_Tema de cor, tipografia, raio, espaçamento e sombra, e usá-los em todas as telas e componentes.
2. THE App_Mobile SHALL usar somente cores da Paleta, sem valores hexadecimais soltos fora dos Tokens_Tema.
3. THE App_Mobile SHALL usar a fonte Nunito (pesos 700 e 800) em títulos e a fonte Inter (pesos 400, 500 e 600) em textos e interface, carregadas por `@expo-google-fonts`.
4. WHILE as fontes não terminaram de carregar, THE App_Mobile SHALL manter a tela inicial de carregamento visível em vez de exibir texto com fonte errada.
5. THE App_Mobile SHALL usar a escala tipográfica de 12, 14, 16, 18, 20, 24, 32 e 40 pt, com altura de linha de 1,5 no corpo e 1,2 nos títulos.
6. THE App_Mobile SHALL aplicar raio de 12 pt em cards, 8 pt em botões e inputs, e formato de pílula em chips e badges.
7. THE App_Mobile SHALL usar espaçamentos múltiplos de 4 pt (4, 8, 12, 16, 24, 32, 48) e margem lateral de 16 pt nas telas.
8. THE App_Mobile SHALL aplicar sombra suave na cor `primary-900` com 8% de opacidade, deslocamento 2 e desfoque 8, e `elevation: 2` no Android.
9. THE App_Mobile SHALL usar o Hexágono no badge de nota, no avatar padrão e no indicador de carregamento.
10. THE App_Mobile SHALL exibir o logo com "JA" em destaque e "LUGA" na cor da superfície: "JA" em `accent-400` e "LUGA" em `white` sobre fundo escuro, e "JA" em `primary-600` e "LUGA" em `primary-900` sobre fundo claro.
11. THE App_Mobile SHALL usar `accent-400` como fundo, com texto `primary-900`, ou como texto apenas sobre fundo `primary-900` ou `primary-600`, e nunca como cor de texto sobre fundo claro.
12. THE App_Mobile SHALL exibir ícones com `lucide-react-native`.

### Requirement 2: Componentes reutilizáveis

**User Story:** Como pessoa que desenvolve o app, quero componentes reutilizáveis com o design system aplicado, para que as próximas fases aproveitem o mesmo código.

#### Acceptance Criteria

1. THE App_Mobile SHALL oferecer os componentes Button (variantes primário, secundário, fantasma e perigo), Input, TextArea, Select, DateRangePicker, PhotoPicker, CategoryChip, StatusBadge, RequestCard, OfferCard, OfferComparator, RentalTimeline, Avatar (com selo de verificado), Rating, EmptyState (com Mascote), Skeleton, BottomActionBar, Header e TabBar.
2. THE App_Mobile SHALL definir cada componente em um arquivo próprio em `src/components/`, com props tipadas em TypeScript.
3. WHEN o usuário pressiona um Button primário, THE Button SHALL exibir a cor `primary-700`.
4. WHILE um Button está desabilitado, THE Button SHALL exibir a cor `primary-300` e não responder ao toque.
5. WHEN um Input recebe foco, THE Input SHALL exibir borda na cor `primary-300`.
6. IF um campo obrigatório está vazio ao tentar avançar, THEN THE Input SHALL exibir borda `danger` e uma mensagem curta em português.
7. THE StatusBadge SHALL exibir uma cor por estado, com texto legível sobre o fundo: Aberto ou Enviada em `primary-100`, Aguardando pagamento em `accent-400`, Confirmado ou Em uso em `primary-600`, Concluído em `success` e Atrasado, Disputa ou Cancelado em `danger`.
8. THE RentalTimeline SHALL exibir as etapas Confirmado, Entrega, Em uso, Devolução e Concluído, com a etapa atual destacada e linha tracejada em `primary-300`.
9. THE Avatar SHALL exibir formato hexagonal e, quando o usuário é verificado, o selo de verificado.
10. THE PhotoPicker SHALL abrir a galeria do celular e exibir a prévia da foto escolhida, sem enviar a foto a nenhum servidor.
11. THE DateRangePicker SHALL permitir escolher data e hora de início e de fim, sem validar prazos ou antecedência.
12. THE OfferComparator SHALL exibir duas ou mais Ofertas lado a lado.

### Requirement 3: Navegação

**User Story:** Como pessoa que testa o app, quero navegar por todas as telas pelos caminhos previstos, para que eu avalie o fluxo completo.

#### Acceptance Criteria

1. WHEN o App_Mobile abre, THE App_Mobile SHALL exibir o Onboarding.
2. WHEN o usuário toca em "Criar conta" ou "Já tenho conta" no Onboarding, THE App_Mobile SHALL abrir a tela Entrar / Criar conta.
3. WHEN o usuário toca em "Entrar" ou "Criar conta" na tela Entrar / Criar conta, THE App_Mobile SHALL abrir o app com as abas.
4. THE TabBar SHALL exibir as abas na ordem Início, Ofertar, "+ Pedir", Aluguéis e Perfil.
5. THE TabBar SHALL exibir o botão "+ Pedir" no centro, em destaque, como círculo `accent-400` com ícone `primary-900` ou `primary-600`.
6. WHEN o usuário toca em "+ Pedir", THE App_Mobile SHALL abrir o fluxo Criar pedido.
7. THE App_Mobile SHALL permitir os seguintes caminhos: Início → Detalhe do meu pedido → Checkout → Aluguel confirmado → Detalhe do aluguel; Ofertar → Detalhe do pedido → Enviar oferta → Oferta enviada; "+ Pedir" → Criar pedido → Pedido publicado → Detalhe do meu pedido; Aluguéis → Detalhe do aluguel; Perfil → Notificações.
8. WHEN o usuário está numa tela de detalhe, THE Header SHALL exibir um botão de voltar com área de toque de pelo menos 44 × 44 pt.
9. THE App_Mobile SHALL manter o usuário nas abas ao voltar de uma tela de detalhe, sem repetir o Onboarding.

### Requirement 4: Tela 1, Onboarding

**User Story:** Como pessoa nova, quero entender o JALUGA em três telas, para que eu saiba como o app funciona antes de criar conta.

#### Acceptance Criteria

1. THE Onboarding SHALL exibir três telas deslizáveis com o Mascote, com os textos "Precisou de algo? Peça.", "Os vizinhos fazem ofertas." e "Seguro do começo ao fim.".
2. THE Onboarding SHALL exibir um indicador de página que mostra a tela atual.
3. THE Onboarding SHALL exibir os botões "Criar conta" e "Já tenho conta".
4. THE Onboarding SHALL exibir o logo do JALUGA.

### Requirement 5: Tela 2, Entrar / Criar conta

**User Story:** Como pessoa que testa o app, quero uma tela de entrada, para que eu chegue ao app sem login real.

#### Acceptance Criteria

1. THE tela Entrar / Criar conta SHALL exibir o logo, os campos de e-mail e senha, o botão "Entrar" e o link "Criar conta".
2. WHEN o usuário toca em "Entrar" ou em "Criar conta", THE App_Mobile SHALL abrir o app sem verificar credenciais e sem chamada de rede.
3. THE tela Entrar / Criar conta SHALL NOT exibir o Mascote.

### Requirement 6: Tela 3, Início

**User Story:** Como Cliente, quero ver meus pedidos e pedir um item rápido, para que eu acompanhe o que publiquei.

#### Acceptance Criteria

1. THE tela Início SHALL exibir a saudação "Oi, Tiago!".
2. THE tela Início SHALL exibir o atalho grande "O que você precisa hoje?", que abre o fluxo Criar pedido.
3. THE tela Início SHALL exibir a lista "Meus pedidos" com um RequestCard por pedido, mostrando título, data, status e número de ofertas.
4. WHEN o usuário toca em um RequestCard, THE App_Mobile SHALL abrir o Detalhe do meu pedido.
5. WHEN o Cliente publica um pedido, THE App_Mobile SHALL exibir esse pedido em "Meus pedidos" até o app ser fechado.
6. WHILE a lista "Meus pedidos" está no Estado_De_Lista vazio, THE tela Início SHALL exibir um EmptyState com o Mascote e o texto "Seu pedido está no ar. Avisamos você quando chegar a primeira oferta." ou um texto equivalente em tom de vizinho.

### Requirement 7: Tela 4, Criar pedido

**User Story:** Como Cliente, quero criar um pedido em passos curtos, para que eu publique o que preciso sem esforço.

#### Acceptance Criteria

1. THE tela Criar pedido SHALL exibir uma barra de progresso com três passos e uma etapa final de revisão.
2. THE passo 1 SHALL pedir título, categoria (por CategoryChip), descrição e foto opcional.
3. THE passo 2 SHALL pedir data e hora de início e de fim.
4. THE passo 3 SHALL pedir bairro e raio, com seletor visual do raio.
5. THE etapa de revisão SHALL exibir o resumo do pedido e o botão "Publicar pedido".
6. IF o usuário tenta avançar com campo obrigatório vazio (título, categoria, datas ou bairro), THEN THE App_Mobile SHALL manter o passo atual e exibir a mensagem do campo.
7. THE App_Mobile SHALL NOT validar prazos, antecedência, tamanho de texto ou limites do raio.
8. WHEN o usuário toca em "Publicar pedido", THE App_Mobile SHALL guardar o pedido em memória e abrir a tela Pedido publicado.
9. THE BottomActionBar SHALL manter o botão de avançar fixo na parte de baixo, acima da Area_Segura.
10. THE tela Criar pedido SHALL NOT exibir o Mascote.

### Requirement 8: Tela 5, Pedido publicado

**User Story:** Como Cliente, quero uma confirmação clara de que meu pedido está no ar, para que eu compartilhe com os vizinhos.

#### Acceptance Criteria

1. THE tela Pedido publicado SHALL exibir o Mascote comemorando e o texto "Seu pedido está no ar!".
2. WHEN o usuário toca em "Compartilhar com vizinhos", THE App_Mobile SHALL abrir o compartilhamento nativo do celular com um texto fixo.
3. WHEN o usuário toca em "Ver meu pedido", THE App_Mobile SHALL abrir o Detalhe do meu pedido.

### Requirement 9: Tela 6, Detalhe do meu pedido

**User Story:** Como Cliente, quero ver e comparar as ofertas que recebi, para que eu escolha a melhor.

#### Acceptance Criteria

1. THE tela SHALL exibir o resumo do pedido, o status e a lista de ofertas.
2. THE OfferCard SHALL exibir foto do item, nome, nota, distância, preço total e a opção entrega, retirada ou ambas, com valores vindos dos Mocks.
3. WHEN o usuário ativa a alternância "comparar", THE tela SHALL exibir o OfferComparator com as Ofertas lado a lado.
4. THE tela SHALL exibir o botão "Aceitar oferta" na BottomActionBar.
5. WHEN o usuário toca em "Aceitar oferta", THE App_Mobile SHALL abrir o Checkout, sem alterar o estado de outras ofertas nem do pedido.
6. WHILE a lista de ofertas está no Estado_De_Lista vazio, THE tela SHALL exibir um EmptyState com o Mascote.

### Requirement 10: Tela 7, Ofertar (pedidos perto de mim)

**User Story:** Como Ofertante, quero ver pedidos de vizinhos, para que eu ofereça um item que tenho.

#### Acceptance Criteria

1. THE tela Ofertar SHALL exibir um filtro por categoria com CategoryChip.
2. THE tela Ofertar SHALL exibir a lista de pedidos de vizinhos com bairro, distância e data, vindos dos Mocks.
3. WHEN o usuário escolhe uma categoria no filtro, THE tela SHALL exibir somente os pedidos dessa categoria.
4. WHEN o usuário toca em um pedido, THE App_Mobile SHALL abrir o Detalhe do pedido (para ofertar).
5. WHILE a lista está no Estado_De_Lista vazio, THE tela SHALL exibir um EmptyState com o Mascote e o texto "Nenhum pedido por perto ainda. Compartilhe o JALUGA com seus vizinhos!".

### Requirement 11: Tela 8, Detalhe do pedido (para ofertar)

**User Story:** Como Ofertante, quero ver os detalhes de um pedido, para que eu decida se faço uma oferta.

#### Acceptance Criteria

1. THE tela SHALL exibir os dados do pedido e o perfil resumido de quem pediu (Avatar, nome, bairro e nota).
2. THE tela SHALL exibir um mapa ilustrativo como imagem estática, sem geolocalização real.
3. THE tela SHALL exibir o botão "Fazer uma oferta" na BottomActionBar.
4. WHEN o usuário toca em "Fazer uma oferta", THE App_Mobile SHALL abrir a tela Enviar oferta.

### Requirement 12: Tela 9, Enviar oferta

**User Story:** Como Ofertante, quero preencher minha oferta, para que o vizinho veja o que ofereço.

#### Acceptance Criteria

1. THE tela Enviar oferta SHALL pedir preço total, valor do item, porte (P, M ou G), fotos do item, estado de conservação, opções de entrega e retirada e mensagem.
2. THE tela SHALL exibir uma caixa de resumo com caução, taxa e "você recebe", com valores fixos dos Mocks e sem cálculo a partir dos campos digitados.
3. IF o usuário toca em "Enviar oferta" com campo obrigatório vazio (preço total, valor do item ou porte), THEN THE App_Mobile SHALL manter a tela e exibir a mensagem do campo.
4. WHEN o usuário toca em "Enviar oferta" com os campos obrigatórios preenchidos, THE App_Mobile SHALL abrir a tela de sucesso "Oferta enviada", com o Mascote.
5. THE tela Enviar oferta SHALL NOT exibir o Mascote, e THE tela de sucesso SHALL exibir o Mascote.
6. THE BottomActionBar SHALL manter o botão "Enviar oferta" fixo na parte de baixo, acima da Area_Segura.
7. THE App_Mobile SHALL NOT validar diária mínima, quantidade de fotos nem limites de ofertas.

### Requirement 13: Tela 10, Checkout

**User Story:** Como Cliente, quero ver o resumo do aluguel antes de confirmar, para que eu entenda o que vou pagar.

#### Acceptance Criteria

1. THE tela Checkout SHALL exibir o resumo do item e de quem aluga.
2. THE tela Checkout SHALL exibir as linhas aluguel, taxa de serviço, frete, caução e total, com valores fixos dos Mocks, e a taxa de serviço somada ao valor do Cliente.
3. THE tela Checkout SHALL permitir escolher entre entrega e retirada.
4. THE tela Checkout SHALL permitir escolher entre Pix e cartão, apenas como seleção visual, sem coletar dados de pagamento.
5. THE tela Checkout SHALL exibir o aviso "Seu dinheiro fica guardado com a gente até a devolução".
6. WHEN o usuário escolhe entrega ou retirada, THE tela Checkout SHALL manter os valores exibidos inalterados.
7. WHEN o usuário toca em "Confirmar aluguel", THE App_Mobile SHALL abrir a tela de sucesso "Aluguel confirmado", com o Mascote.
8. THE tela Checkout SHALL NOT exibir o Mascote nem a política de cancelamento.
9. THE BottomActionBar SHALL manter o botão "Confirmar aluguel" fixo na parte de baixo, acima da Area_Segura.

### Requirement 14: Tela 11, Detalhe do aluguel

**User Story:** Como Cliente ou Ofertante, quero acompanhar as etapas do aluguel, para que eu saiba o que falta.

#### Acceptance Criteria

1. THE tela SHALL exibir a RentalTimeline com a etapa atual do aluguel vinda dos Mocks.
2. THE tela SHALL exibir os dados do item e o contato da outra parte.
3. THE tela SHALL exibir os botões visuais "Ver contrato", "Abrir chat" e "Confirmar recebimento".
4. WHEN o usuário toca em "Ver contrato", "Abrir chat" ou "Confirmar recebimento", THE App_Mobile SHALL NOT abrir contrato real, chat real nem alterar a etapa do aluguel, e SHALL exibir uma mensagem curta de que o recurso é só visual neste protótipo.
5. THE tela SHALL NOT exibir o Mascote.

### Requirement 15: Tela 12, Aluguéis

**User Story:** Como usuário, quero ver meus aluguéis nos dois papéis, para que eu acompanhe cada um.

#### Acceptance Criteria

1. THE tela Aluguéis SHALL exibir as abas "Estou alugando" e "Estou ofertando".
2. THE tela SHALL exibir, em cada aba, cards de aluguel com StatusBadge em estados diferentes, vindos dos Mocks.
3. WHEN o usuário toca em um card, THE App_Mobile SHALL abrir o Detalhe do aluguel.
4. WHILE uma aba está no Estado_De_Lista vazio, THE tela SHALL exibir um EmptyState com o Mascote.

### Requirement 16: Tela 13, Perfil e Notificações

**User Story:** Como usuário, quero ver meu perfil e minhas notificações, para que eu conheça minha reputação e novidades.

#### Acceptance Criteria

1. THE tela Perfil SHALL exibir Avatar hexagonal com selo de verificado, nome, bairro, nota média, número de aluguéis e avaliações recebidas.
2. THE tela Perfil SHALL exibir os itens de menu Notificações, Carteira, Ajuda e Sair.
3. WHEN o usuário toca em "Notificações", THE App_Mobile SHALL abrir a lista de notificações simuladas.
4. WHEN o usuário toca em "Carteira", "Ajuda" ou "Sair", THE App_Mobile SHALL NOT abrir outra tela.
5. THE tela Perfil SHALL oferecer o Modo_Teste de forma oculta.
6. WHILE a lista de notificações está no Estado_De_Lista vazio, THE tela SHALL exibir um EmptyState com o Mascote.

### Requirement 17: Estados de lista

**User Story:** Como pessoa que testa o app, quero ver cada lista com dados, vazia e carregando, para que eu avalie todos os estados.

#### Acceptance Criteria

1. THE App_Mobile SHALL suportar os estados dados, vazio e carregando em toda tela de lista: Meus pedidos, ofertas do pedido, pedidos perto de mim, aluguéis e notificações.
2. WHILE o Estado_De_Lista é carregando, THE tela SHALL exibir Skeletons no lugar do conteúdo.
3. WHILE o Estado_De_Lista é vazio, THE tela SHALL exibir um EmptyState com o Mascote.
4. WHEN o usuário ativa o Modo_Teste e escolhe um Estado_De_Lista, THE App_Mobile SHALL aplicar esse estado às telas de lista.
5. THE Modo_Teste SHALL ficar escondido, acessível por um gesto simples no Perfil (por exemplo, tocar várias vezes no avatar).

### Requirement 18: Dados simulados

**User Story:** Como pessoa que testa o app, quero dados realistas de Mogi das Cruzes, para que o protótipo pareça de verdade.

#### Acceptance Criteria

1. THE App_Mobile SHALL ler todos os dados de arquivos TypeScript tipados em `src/mocks/`.
2. THE Mocks SHALL conter 6 usuários fictícios nos bairros Centro, Mogilar, Vila Oliveira, Braz Cubas, César de Souza e Socorro, com nota e número de aluguéis.
3. THE Mocks SHALL conter os pedidos: furadeira para o sábado, caixa de som para aniversário, mala grande para viagem, cadeirinha de carro, barraca de camping, lavadora de alta pressão e projetor para ver o jogo.
4. THE Mocks SHALL conter de 2 a 4 ofertas por pedido, com preços a partir de R$ 15 por dia e mistura de entrega e retirada.
5. THE Mocks SHALL conter um aluguel em cada etapa da RentalTimeline.
6. THE Mocks SHALL conter as categorias: Ferramentas e casa, Festas e eventos, Viagem e lazer, Bebê e família, Mudança e transporte, Tecnologia e criação, Saúde e recuperação, Ocasiões especiais e Outros.
7. THE Mocks SHALL conter valores fixos de referência para os resumos (taxa de serviço, caução e total) sem que o App_Mobile calcule esses valores.
8. THE Mocks SHALL usar ilustrações ou placeholders livres de direitos para itens e SHALL NOT usar fotos de pessoas reais.

### Requirement 19: Uso do Mascote

**User Story:** Como responsável pela marca, quero o jabuti só nos lugares certos, para que formulários e pagamentos fiquem focados.

#### Acceptance Criteria

1. THE App_Mobile SHALL exibir o Mascote somente no Onboarding, nas telas de sucesso (Pedido publicado, Oferta enviada e Aluguel confirmado) e nos estados vazios.
2. THE App_Mobile SHALL NOT exibir o Mascote em formulários, no Checkout nem em telas de contrato.
3. THE App_Mobile SHALL carregar o Mascote de `assets/brand/jabuti.png`.

### Requirement 20: Acessibilidade e layout

**User Story:** Como pessoa usuária, quero um app legível e fácil de tocar, para que eu use sem dificuldade em qualquer celular.

#### Acceptance Criteria

1. THE App_Mobile SHALL manter contraste mínimo WCAG 2.1 AA (4,5:1 para texto normal e 3:1 para texto grande) em todos os textos.
2. THE App_Mobile SHALL oferecer área de toque de pelo menos 44 × 44 pt em todo elemento interativo.
3. THE App_Mobile SHALL respeitar as Areas_Seguras do celular em todas as telas.
4. THE BottomActionBar SHALL ficar fixa na parte de baixo da tela, acima da Area_Segura inferior.
5. THE App_Mobile SHALL exibir todas as telas sem cortes nem sobreposição em larguras de 360 a 430 pt, em orientação retrato.
6. THE App_Mobile SHALL definir `accessibilityLabel` e `accessibilityRole` em elementos interativos e em imagens informativas.

### Requirement 21: Restrições da Fase 1

**User Story:** Como responsável pelo produto, quero manter a Fase 1 enxuta, para que o protótipo valide só o visual e a navegação.

#### Acceptance Criteria

1. THE App_Mobile SHALL NOT fazer chamadas de rede, nem usar backend, API ou banco de dados.
2. THE App_Mobile SHALL NOT calcular preço, comissão, caução, prazos ou raio, nem validar estados do pedido, da oferta ou do aluguel.
3. THE App_Mobile SHALL tratar login, pagamento, chat, contrato, notificações e mapa como componentes apenas visuais.
4. THE App_Mobile SHALL NOT usar câmera real, geolocalização real nem notificações push.
5. THE App_Mobile SHALL NOT exibir política de cancelamento.
6. THE App_Mobile SHALL exibir todos os textos de interface em português do Brasil, em tom amigável de vizinho, com tratamento "você".
7. THE App_Mobile SHALL executar no Expo Go em iOS e Android, usando somente dependências compatíveis com o Expo Go.
8. THE App_Mobile SHALL guardar em memória os dados que o usuário cria, e esses dados SHALL ser descartados quando o app fecha.

### Requirement 22: Critérios de aceite da fase

**User Story:** Como responsável pelo produto, quero um conjunto verificável de critérios, para que eu aprove a Fase 1.

#### Acceptance Criteria

1. WHEN o App_Mobile é aberto no Expo Go em iOS e Android, THE App_Mobile SHALL carregar sem erro e permitir acessar as 13 telas pela navegação do Requirement 3.
2. THE App_Mobile SHALL aplicar cores, fontes, raios e espaçamentos conforme os Tokens_Tema e SHALL NOT usar nenhuma cor fora da Paleta.
3. THE App_Mobile SHALL exibir o logo com "JA" em destaque e "LUGA" na cor da superfície.
4. THE App_Mobile SHALL exibir o Mascote somente onde o Requirement 19 permite.
5. THE App_Mobile SHALL oferecer os estados dados, vazio e carregando em todas as listas.
6. THE App_Mobile SHALL manter os botões principais fixos na parte de baixo, respeitando a Area_Segura.
7. THE App_Mobile SHALL manter contraste AA e áreas de toque de pelo menos 44 pt em todas as telas.
8. THE App_Mobile SHALL NOT fazer chamadas de rede nem implementar regras de negócio.

## Pontos em aberto

Não bloqueiam esta fase.

- **Quem paga a taxa de 25%:** nos Mocks, a taxa aparece como "taxa de serviço" somada ao valor do Cliente. A decisão final fica para uma fase futura.
- **Política de cancelamento:** não é exibida nesta fase.
- **Arquivo do Mascote:** `jaluga-mascote-jabuti_2.png` não foi encontrado no workspace. É preciso copiá-lo para `jaluga-app/assets/brand/jabuti.png` antes de construir as telas com o Mascote.

## Divergências entre os documentos (resolvidas pela Fase 1)

- **Ordem das abas:** o briefing usa Início · Pedir · Ofertar · Aluguéis · Perfil. A Fase 1 usa Início · Ofertar · [+ Pedir] · Aluguéis · Perfil. Vale a Fase 1.
- **Botão "+ Pedir":** o briefing o descreve como círculo roxo com "+". A Fase 1 o descreve como círculo amarelo com ícone roxo. Vale a Fase 1.
- **Bairros:** o briefing inclui Jundiapeba. A Fase 1 lista seis bairros, sem Jundiapeba. Vale a lista da Fase 1.
