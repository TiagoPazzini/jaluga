# JALUGA: Fase 1 — telas principais do app (sem regras de negócio)

> **Para o Kiro:** construa um **protótipo navegável** do app mobile JALUGA, com as telas principais, o design system aplicado e **dados simulados**. Nesta fase **não há regras de negócio, backend, login real nem pagamento**.
>
> **Referência completa:** `JALUGA-briefing-MVP-mobile.md`. Use dele a **seção 4 (design system)** e a **seção 5 (telas)** como base visual. As seções 6 a 8 (regras, estados e dados) ficam para as próximas fases e **não devem ser implementadas agora**.

---

## 0. Prompt inicial sugerido

> "Crie a spec da Fase 1 do app JALUGA com base em `JALUGA-fase1-telas.md`, usando o design system da seção 4 de `JALUGA-briefing-MVP-mobile.md`. O objetivo é um protótipo navegável em React Native + Expo, com as 13 telas listadas, dados simulados em arquivos locais e nenhuma regra de negócio. Comece pelo design system (tema, fontes e componentes) e depois construa as telas na ordem da seção 6."

---

## 1. Objetivo da fase

- Ver e testar o **visual e a navegação** do app num celular real (Expo Go, iOS e Android).
- Validar a **experiência** dos fluxos principais com pessoas antes de construir o backend.
- Deixar prontos o **design system** e os **componentes**, que serão reaproveitados nas próximas fases.

## 2. O que NÃO fazer nesta fase

- **Sem backend, sem banco de dados e sem API.** Todos os dados vêm de arquivos locais em `src/mocks/`.
- **Sem login real.** As telas de cadastro e login só navegam para o app.
- **Sem pagamento, contrato, caução ou comissão calculados.** Os valores nas telas são **fixos**, vindos dos mocks.
- **Sem validações de regras** (prazos, raio, diária mínima, limites de ofertas, estados). Só validação visual básica de campo obrigatório.
- **Sem notificações push, geolocalização real, câmera real ou chat funcionando.** Usar componentes visuais com dados simulados (o upload de fotos pode abrir a galeria, mas não envia nada).

**Pode fazer:** guardar em memória (estado local) o que o usuário cria durante o uso. Exemplo: um pedido criado aparece em "Meus pedidos" até fechar o app.

## 3. Stack

- **React Native + Expo (TypeScript)**, com **Expo Router** para navegação
- **NativeWind** (Tailwind para React Native) com os tokens de cor, espaço e raio no `tailwind.config`
- Fontes **Nunito** (títulos) e **Inter** (texto) via `@expo-google-fonts`
- Ícones **Lucide** (`lucide-react-native`)
- Estado local simples com **Zustand** ou React Context
- Mascote em `assets/brand/jabuti.png` (copiar o arquivo `jaluga-mascote-jabuti_2.png`)

## 4. Design system (resumo; detalhes na seção 4 do briefing completo)

| Token | Hex | Uso |
|---|---|---|
| `primary-50` | `#F8F5FF` | Fundo das telas |
| `primary-100` | `#EDE4FF` | Chips, círculos de ícone, destaques |
| `primary-300` | `#B394F0` | Bordas de foco, linha tracejada da rota |
| `primary-600` | `#6C2BD9` | **Cor principal**: botões, links, aba ativa |
| `primary-700` | `#5A22B8` | Botão pressionado |
| `primary-900` | `#2A0E5C` | Texto principal, header escuro |
| `accent-400` | `#FFC93C` | "JA" do logo, badges, botão "Pedir" na barra |
| `text-muted` | `#6E6090` | Texto secundário |
| `border` | `#E3D8FA` | Bordas de cards e inputs |
| `success` / `danger` | `#1F9D55` / `#D64545` | Confirmação / erro e cancelamento |

- **Amarelo nunca como texto sobre fundo claro.**
- Raio de 12 pt em cards e 8 pt em botões e inputs. Chips e badges em formato pílula.
- **Hexágono** (casco do jabuti) como motivo: badge de nota, avatar padrão, indicador de carregamento.
- Áreas de toque com no mínimo 44 × 44 pt. Contraste WCAG AA.
- Tom de voz amigável, de vizinho, sempre com "você".

### Componentes a criar
`Button` (primário, secundário, fantasma, perigo) · `Input` · `TextArea` · `Select` · `DateRangePicker` · `PhotoPicker` · `CategoryChip` · `StatusBadge` · `RequestCard` · `OfferCard` · `OfferComparator` · `RentalTimeline` · `Avatar` (com selo de verificado) · `Rating` · `EmptyState` (com mascote) · `Skeleton` · `BottomActionBar` (botão fixo embaixo) · `Header` · `TabBar`

## 5. Navegação

```
Onboarding (3 telas) ──> Entrar / Criar conta ──> App (abas)

Abas:  Início  ·  Ofertar  ·  [ + Pedir ]  ·  Aluguéis  ·  Perfil

Início ──> Detalhe do meu pedido ──> Checkout ──> Aluguel confirmado ──> Detalhe do aluguel
Ofertar (pedidos perto de mim) ──> Detalhe do pedido ──> Enviar oferta ──> Oferta enviada
[ + Pedir ] ──> Criar pedido (3 passos) ──> Pedido publicado ──> Detalhe do meu pedido
Aluguéis ──> Detalhe do aluguel
Perfil ──> Notificações
```

O botão **"+ Pedir"** fica no centro da barra, em destaque (círculo amarelo com ícone roxo).

## 6. Telas da Fase 1 (13)

| # | Tela | O que mostrar |
|---|---|---|
| 1 | **Onboarding** | 3 telas deslizáveis com o jabuti: (1) "Precisou de algo? Peça." (2) "Os vizinhos fazem ofertas." (3) "Seguro do começo ao fim." Indicador de página e botões "Criar conta" e "Já tenho conta" |
| 2 | **Entrar / Criar conta** | Logo, campos de e-mail e senha, botão "Entrar", link "Criar conta" (só visual). Os dois botões levam ao app |
| 3 | **Início** | Saudação ("Oi, Tiago!"), atalho grande "O que você precisa hoje?", lista "Meus pedidos" com `RequestCard` (título, data, status, nº de ofertas) e estado vazio com mascote |
| 4 | **Criar pedido** (3 passos) | Barra de progresso. Passo 1: título, categoria (chips) e descrição, foto opcional. Passo 2: data e hora de início e fim. Passo 3: bairro e raio (seletor visual). Tela de revisão com botão "Publicar pedido" |
| 5 | **Pedido publicado** | Mascote comemorando, "Seu pedido está no ar!", botões "Compartilhar com vizinhos" (abre o compartilhamento do celular com um texto fixo) e "Ver meu pedido" |
| 6 | **Detalhe do meu pedido** | Resumo do pedido, status, lista de ofertas (`OfferCard`: foto do item, nome, nota, distância, preço total, entrega/retirada) e alternância para modo **comparar** (`OfferComparator` lado a lado). Botão "Aceitar oferta" |
| 7 | **Ofertar (pedidos perto de mim)** | Filtro por categoria, lista de pedidos de vizinhos com bairro, distância e data. Estado vazio com mascote |
| 8 | **Detalhe do pedido (para ofertar)** | Dados do pedido, perfil resumido de quem pediu, mapa ilustrativo (imagem estática) e botão "Fazer uma oferta" |
| 9 | **Enviar oferta** | Preço total, valor do item, porte (P/M/G), fotos do item, estado de conservação, opções de entrega e retirada, mensagem. Caixa de resumo com valores **fixos dos mocks** (caução, taxa, você recebe). Botão "Enviar oferta" e tela de sucesso |
| 10 | **Checkout** | Resumo do item e de quem aluga. Linhas: aluguel, taxa de serviço, frete, caução e total (valores fixos). Escolha entrega/retirada, forma de pagamento (Pix ou cartão, só visual), aviso "Seu dinheiro fica guardado com a gente até a devolução" e botão "Confirmar aluguel" |
| 11 | **Detalhe do aluguel** | `RentalTimeline` (Confirmado → Entrega → Em uso → Devolução → Concluído) com a etapa atual destacada, dados do item, contato da outra parte, botões visuais "Ver contrato", "Abrir chat" e "Confirmar recebimento" |
| 12 | **Aluguéis** | Abas "Estou alugando" e "Estou ofertando", com cards e `StatusBadge` em vários estados |
| 13 | **Perfil** | Avatar hexagonal com selo de verificado, nome, bairro, nota média, nº de aluguéis, avaliações recebidas, e itens de menu (Notificações, Carteira, Ajuda, Sair). Só "Notificações" abre uma tela (lista simulada) |

**Cada tela de lista deve ter:** estado com dados, estado vazio (com mascote) e estado carregando (skeleton). Deixar um jeito simples de alternar entre eles para teste (por exemplo, uma opção oculta no Perfil).

## 7. Dados simulados (`src/mocks/`)

- **Usuários:** 6 pessoas fictícias em bairros de Mogi das Cruzes (Centro, Mogilar, Vila Oliveira, Braz Cubas, César de Souza, Socorro), com nota e número de aluguéis.
- **Pedidos:** furadeira para o sábado, caixa de som para aniversário, mala grande para viagem, cadeirinha de carro, barraca de camping, lavadora de alta pressão, projetor para ver o jogo.
- **Ofertas:** 2 a 4 por pedido, com preços a partir de R$ 15 por dia e mistura de entrega e retirada.
- **Aluguéis:** um em cada etapa da linha do tempo.
- **Categorias:** Ferramentas e casa · Festas e eventos · Viagem e lazer · Bebê e família · Mudança e transporte · Tecnologia e criação · Saúde e recuperação · Ocasiões especiais · Outros.
- **Valores de referência** para os resumos fixos: taxa de serviço de 25% sobre o aluguel; caução por faixa (20% até R$ 200, 30% até R$ 1.000, 40% até R$ 3.000, 50% acima). São só números para exibição, **sem cálculo**.
- Fotos de itens: usar ilustrações ou placeholders livres de direitos; **não usar fotos de pessoas reais**.

## 8. Critérios de aceite

- O app abre no Expo Go (iOS e Android) e **todas as 13 telas são acessíveis** pela navegação descrita.
- Cores, fontes, raios e espaçamentos seguem os tokens. Nenhuma cor fora da paleta.
- O logo aparece com "JA" em destaque e "LUGA" na cor da superfície.
- O mascote aparece só onde indicado: onboarding, sucesso e estados vazios.
- Todas as listas têm estados de dados, vazio e carregando.
- Botões principais ficam fixos na parte de baixo e respeitam a área segura.
- Textos com contraste AA e áreas de toque de pelo menos 44 pt.
- Nenhuma chamada de rede e nenhuma regra de negócio implementada.

## 9. Ordem de construção

1. Projeto Expo, tema (tokens), fontes e assets
2. Componentes base (botões, inputs, cards, badges, empty state, skeleton)
3. Navegação: onboarding, login e barra de abas
4. Fluxo de pedir: Início → Criar pedido → Pedido publicado → Detalhe do meu pedido
5. Fluxo de ofertar: Ofertar → Detalhe do pedido → Enviar oferta
6. Fluxo do aluguel: Checkout → Detalhe do aluguel → Aluguéis
7. Perfil e Notificações
8. Revisão visual em telas pequenas (360 pt) e grandes (430 pt)
