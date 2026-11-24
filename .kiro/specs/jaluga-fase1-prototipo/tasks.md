# Implementation Plan

Ordem de construção da seção 9 da Fase 1: projeto e tema, componentes base, navegação, fluxo de pedir, fluxo de ofertar, fluxo do aluguel, perfil e notificações, revisão em 360 e 430 pt.

Convenções para todas as tarefas:
- Cada tarefa termina com algo que dá para ver no Expo Go (iOS e Android) e com `npx tsc --noEmit` sem erro.
- Sem cores hex fora de `src/theme/tokens.js`. Sem rede. Sem cálculo de valores. Textos em pt-BR.
- Cada componente tem arquivo próprio em `src/components/`, com props tipadas, `accessibilityRole` e `accessibilityLabel` quando interativo, e área de toque mínima de 44 × 44 pt.
- Nenhuma tarefa deixa código sem uso: todo componente criado é exibido numa tela de teste ou numa tela real na mesma etapa ou na seguinte.

## 1. Projeto, tema, fontes e assets

- [ ] 1.1 Criar o projeto Expo com TypeScript strict e Expo Router em `jaluga-app/`
  - Manter `docs/` e `assets/` existentes. Instalar as dependências do design.md com `npx expo install`.
  - Conferir que `tsconfig.json` tem `"strict": true`.
  - Teste: `npx expo start` abre uma tela inicial no Expo Go.
  - _Requisitos: 21.7_

- [ ] 1.2 Configurar NativeWind
  - Criar `babel.config.js`, `metro.config.js`, `global.css` e `nativewind-env.d.ts`. Importar `global.css` em `app/_layout.tsx`.
  - Teste: uma classe como `bg-white` e `px-4` aparece aplicada num `View` de teste.
  - _Requisitos: 1.1_

- [ ] 1.3 Criar `src/theme/tokens.js`, `tokens.d.ts` e `tailwind.config.js`
  - Cores só da Paleta (em `theme.colors`, não em `extend`), famílias de fonte, escala de fonte, espaçamento, raios.
  - Teste: `bg-primary-600` aplica `#6C2BD9` e `bg-red-500` não gera estilo.
  - _Requisitos: 1.1, 1.2, 1.5, 1.6, 1.7_

- [ ] 1.4 Criar `src/theme/colors.ts`, `shadow.ts` e `fonts.ts`
  - `shadowCard` com `#2A0E5C` a 8%, offset 2, raio 8, `elevation: 2`.
  - Teste: um card de teste mostra a sombra leve no iOS e no Android.
  - _Requisitos: 1.3, 1.8_

- [ ] 1.5 Carregar fontes no `app/_layout.tsx` com tela inicial de carregamento
  - `useFonts` com Nunito 700/800 e Inter 400/500/600, `SplashScreen.preventAutoHideAsync()` e `hideAsync()` após o carregamento. Stack raiz renderiza só depois das fontes.
  - Teste: títulos aparecem em Nunito e textos em Inter, sem piscar fonte padrão.
  - _Requisitos: 1.3, 1.4_

- [ ] 1.6 Preparar o mascote
  - Verificar se `assets/brand/jabuti.png` existe. Se não existir, pedir ao usuário que copie `jaluga-mascote-jabuti_2.png` com esse nome antes de seguir para a tarefa 2.4.
  - Teste: `require('../assets/brand/jabuti.png')` resolve sem erro.
  - _Requisitos: 19.3_

- [ ] 1.7 Criar `src/utils/formatBRL.ts`
  - Formata número em `R$ 1.234,50` com `Intl.NumberFormat('pt-BR')`. Sem outra função monetária.
  - Teste: `formatBRL(1234.5)` exibe `R$ 1.234,50` numa tela de teste.
  - _Requisitos: 21.2_

## 2. Componentes base

Criar uma tela temporária `app/_vitrine.tsx` (só em desenvolvimento) que exibe cada componente novo, para testar no Expo Go. Ela é removida na tarefa 10.2.

- [ ] 2.1 Criar `Screen`, `Header` e `BottomActionBar`
  - `Screen`: SafeArea, margem lateral de 16 pt, espaço reservado para a barra inferior. `BottomActionBar`: fixa embaixo, acima da área segura. `Header`: botão voltar com 44 × 44 pt.
  - Teste: na vitrine, o botão inferior fica acima da barra de gestos em iPhone com notch e em Android.
  - _Requisitos: 3.8, 20.2, 20.3, 20.4_

- [ ] 2.2 Criar `Button` com as quatro variantes
  - Primário (`primary-600`, pressionado `primary-700`), secundário, fantasma, perigo, com estado desabilitado em `primary-300` e `icon` opcional.
  - Teste: tocar mostra a cor pressionada. Desabilitado não responde ao toque.
  - _Requisitos: 1.6, 2.1, 2.3, 2.4, 20.2_

- [ ] 2.3 Criar `Logo`, `Hexagono` e `LoadingHexagono`
  - `Logo`: "JA" e "LUGA" nas cores dos fundos claro e escuro. `Hexagono` com `react-native-svg`. `LoadingHexagono` girando.
  - Teste: logo correto em fundo claro e escuro. Hexágono gira.
  - _Requisitos: 1.9, 1.10, 1.11_

- [ ] 2.4 Criar `Mascote`, `ItemPlaceholder` e `MapaIlustrativo`
  - `Mascote` usa `jabuti.png` e, se o arquivo faltar, um hexágono com ícone como substituto. `ItemPlaceholder` usa ícones Lucide por `IconeItem`. `MapaIlustrativo` é SVG estático.
  - Teste: os três aparecem na vitrine, sem imagem de pessoa.
  - _Requisitos: 11.2, 18.8, 19.3_

- [ ] 2.5 Criar `Input`, `TextArea` e `Select`
  - Borda `primary-300` com foco, `danger` e mensagem em caso de erro, rótulo obrigatório.
  - Teste: focar muda a borda. Passar `error` mostra a mensagem. `Select` abre opções e escolhe uma.
  - _Requisitos: 2.1, 2.5, 2.6_

- [ ] 2.6 Criar `CategoryChip`, `OpcaoCard` e `RaioSelector`
  - Chip em pílula (`primary-100`, selecionado em `primary-600`). `OpcaoCard` para entrega/retirada e Pix/cartão. `RaioSelector` visual.
  - Teste: tocar alterna a seleção e o seletor de raio muda o valor.
  - _Requisitos: 1.6, 2.1, 7.4_

- [ ] 2.7 Criar `PhotoPicker`
  - `expo-image-picker` abre a galeria, mostra a prévia e permite remover. Se a permissão for negada, mostra mensagem curta. Nada é enviado.
  - Teste: escolher uma foto mostra a prévia no Expo Go.
  - _Requisitos: 2.10, 21.1_

- [ ] 2.8 Criar `DateRangePicker`
  - `@react-native-community/datetimepicker` para data e hora de início e fim, sem validação de prazo.
  - Teste: escolher início e fim atualiza os campos no iOS e no Android.
  - _Requisitos: 2.11, 7.3, 7.7_

- [ ] 2.9 Criar `StatusBadge`, `Rating` e `Avatar`
  - `StatusBadge` com uma cor por estado (R2.7). `Rating` com hexágono. `Avatar` hexagonal com iniciais e selo de verificado.
  - Teste: todos os estados do badge aparecem com texto legível. O selo aparece quando `verificado` é verdadeiro.
  - _Requisitos: 1.9, 2.7, 2.9_

- [ ] 2.10 Criar `Skeleton`, `SkeletonCard` e `EmptyState`
  - `Skeleton` com pulso. `SkeletonCard` com as variantes pedido, oferta, aluguel e notificação. `EmptyState` com `Mascote` por padrão.
  - Teste: skeletons pulsam. O estado vazio mostra o mascote e o texto.
  - _Requisitos: 17.2, 17.3, 19.1_

- [ ] 2.11 Criar `FeedbackToast` e `TelaSucesso`
  - Toast curto para "só visual". `TelaSucesso` com `Mascote`, título, descrição e ações.
  - Teste: o toast aparece e some. A tela de sucesso mostra o mascote e os botões.
  - _Requisitos: 14.4, 19.1_

## 3. Tipos, mocks, stores e componentes de dados

- [ ] 3.1 Criar os tipos em `src/types/`
  - `categoria`, `usuario`, `pedido`, `oferta`, `aluguel`, `notificacao` e `ui`, como no design.md.
  - Teste: `npx tsc --noEmit` passa.
  - _Requisitos: 18.1_

- [ ] 3.2 Criar `categorias.ts` e `usuarios.ts`
  - 9 categorias. 6 usuários nos bairros da Fase 1, com Tiago (Centro) como `USUARIO_LOGADO_ID`. Sem foto de pessoa.
  - Teste: uma tela de teste lista usuários e categorias.
  - _Requisitos: 18.2, 18.6, 18.8_

- [ ] 3.3 Criar `pedidos.ts` e `ofertas.ts`
  - 7 pedidos (3 do Tiago e 4 dos vizinhos) e de 2 a 4 ofertas por pedido, com preço por dia a partir de R$ 15 e mistura de entrega e retirada. Valores escritos à mão.
  - Teste: tela de teste lista os pedidos e a contagem de ofertas.
  - _Requisitos: 18.3, 18.4_

- [ ] 3.4 Criar `alugueis.ts`, `notificacoes.ts` e `referencia.ts`
  - 5 aluguéis, um por etapa, com `resumo` fixo (taxa de serviço somada ao valor do cliente). Notificações simuladas. Texto fixo de compartilhamento.
  - Teste: os 5 aluguéis aparecem com o resumo.
  - _Requisitos: 18.5, 18.7, 8.2_

- [ ] 3.5 Criar `src/mocks/index.ts` com buscas simples
  - `getPedido`, `getOfertasDoPedido`, `getUsuario`, `getAluguel`, só com `find` e `filter`.
  - Teste: buscar um `id` inexistente devolve `undefined`, e `getOfertasDoPedido` de um pedido novo devolve `[]`.
  - _Requisitos: 18.1, 21.2_

- [ ] 3.6 Criar as stores e o hook de estado de lista
  - `pedidosStore` (rascunho, `pedidosCriados`, `publicarRascunho`), `listaEstadoStore` e `useListaEstado`.
  - Teste: um botão de teste altera o estado de lista e o valor muda na tela.
  - _Requisitos: 6.5, 17.4, 21.8_

- [ ] 3.7 Criar `Lista`, `RequestCard`, `PedidoVizinhoCard` e `OfferCard`
  - `Lista` aplica dados, vazio e carregando. Os cards exibem os campos do design.md.
  - Teste: na vitrine, alternar o estado de lista troca entre cards, skeleton e estado vazio com mascote.
  - _Requisitos: 6.3, 9.2, 10.2, 17.1, 17.2, 17.3_

- [ ] 3.8 Criar `OfferComparator`, `RentalTimeline`, `AluguelCard`, `ResumoLinha` e `NotificacaoItem`
  - Comparador lado a lado. Linha do tempo com 5 etapas, linha tracejada `primary-300` e etapa atual destacada.
  - Teste: cada etapa dos 5 aluguéis destaca o passo certo. O comparador mostra 2 ofertas lado a lado em 360 pt.
  - _Requisitos: 2.8, 2.12, 13.2, 15.2_

## 4. Navegação: onboarding, entrar e abas

- [ ] 4.1 Montar o Stack raiz e as rotas vazias
  - `app/index.tsx` redireciona para `(onboarding)`. Criar os grupos e arquivos de rota do design.md com um título provisório.
  - Teste: o app abre e é possível chegar a cada rota por `router.push` num botão de teste.
  - _Requisitos: 3.1_

- [ ] 4.2 Construir a tela Onboarding
  - `FlatList` horizontal com 3 páginas, mascote, textos do R4.1, indicador de página, botões "Criar conta" e "Já tenho conta".
  - Teste: deslizar muda a página e o indicador. Os botões levam à tela Entrar.
  - _Requisitos: 3.2, 4.1, 4.2, 4.3, 4.4_

- [ ] 4.3 Construir a tela Entrar / Criar conta
  - Logo, e-mail, senha, "Entrar" e "Criar conta", sem mascote. Ambos usam `router.replace` para o app.
  - Teste: os dois botões abrem as abas e voltar não retorna ao login.
  - _Requisitos: 3.3, 5.1, 5.2, 5.3_

- [ ] 4.4 Construir a `TabBar` e o layout das abas
  - Ordem Início, Ofertar, "+ Pedir", Aluguéis, Perfil. Botão central em círculo `accent-400` com ícone `primary-900`, que chama `router.push('/pedido/novo')`. Aba ativa em `primary-600`.
  - Teste: as 4 abas navegam. O botão central abre a rota de criar pedido. Toques de 44 pt ou mais.
  - _Requisitos: 3.4, 3.5, 3.6, 20.2_

## 5. Fluxo de pedir

- [ ] 5.1 Construir a tela Início
  - Saudação "Oi, Tiago!", atalho "O que você precisa hoje?" para `/pedido/novo`, `Lista` de `RequestCard` com os pedidos do Tiago e `pedidosCriados`.
  - Teste: os 3 pedidos aparecem. Tocar abre `/pedido/[id]` (ainda provisório). O estado vazio mostra o mascote.
  - _Requisitos: 6.1, 6.2, 6.3, 6.4, 6.6_

- [ ] 5.2 Construir Criar pedido, passo 1
  - Barra de progresso, título, categoria (chips), descrição, foto opcional. Campo obrigatório vazio mantém o passo e mostra erro.
  - Teste: avançar sem título mostra a mensagem. Preenchido, avança.
  - _Requisitos: 7.1, 7.2, 7.6, 7.9, 7.10_

- [ ] 5.3 Construir Criar pedido, passos 2 e 3
  - Passo 2: `DateRangePicker`. Passo 3: bairro (`Select`) e `RaioSelector`. Voltar entre passos mantém o rascunho na store.
  - Teste: voltar do passo 3 ao 1 mantém o que foi digitado.
  - _Requisitos: 7.3, 7.4, 7.6, 7.7_

- [ ] 5.4 Construir a revisão e publicar
  - Resumo do rascunho e botão "Publicar pedido" que chama `publicarRascunho` e faz `router.replace('/pedido/publicado')`.
  - Teste: depois de publicar, o pedido novo aparece no Início.
  - _Requisitos: 6.5, 7.5, 7.8_

- [ ] 5.5 Construir Pedido publicado
  - `TelaSucesso` "Seu pedido está no ar!", botão "Compartilhar com vizinhos" (`Share.share` com texto fixo) e "Ver meu pedido".
  - Teste: o share sheet do celular abre com o texto fixo. "Ver meu pedido" abre o detalhe do pedido novo.
  - _Requisitos: 8.1, 8.2, 8.3_

- [ ] 5.6 Construir Detalhe do meu pedido
  - Resumo, `StatusBadge`, alternância lista/comparar, `Lista` de `OfferCard` ou `OfferComparator`, `BottomActionBar` "Aceitar oferta" que abre `/checkout/[ofertaId]`. Pedido novo mostra estado vazio com mascote.
  - Teste: alternar para comparar mostra as ofertas lado a lado. O pedido criado em 5.4 mostra o estado vazio.
  - _Requisitos: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

## 6. Fluxo de ofertar

- [ ] 6.1 Construir a tela Ofertar
  - Faixa de `CategoryChip` com filtro local e `Lista` de `PedidoVizinhoCard` com bairro, distância e data. Texto de vazio do R10.5.
  - Teste: escolher uma categoria filtra a lista. O estado vazio mostra o mascote.
  - _Requisitos: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ] 6.2 Construir Detalhe do pedido (para ofertar)
  - Dados do pedido, `Avatar` e perfil resumido do dono, `MapaIlustrativo`, botão "Fazer uma oferta" fixo embaixo.
  - Teste: o botão abre a tela Enviar oferta do mesmo pedido.
  - _Requisitos: 11.1, 11.2, 11.3, 11.4_

- [ ] 6.3 Construir Enviar oferta
  - Campos do R12.1 e caixa de resumo com `ResumoLinha` de `referencia.ts`. Obrigatórios: preço total, valor do item e porte. Sem mascote.
  - Teste: enviar sem preço mostra o erro. Alterar o preço não muda a caixa de resumo.
  - _Requisitos: 12.1, 12.2, 12.3, 12.5, 12.6, 12.7_

- [ ] 6.4 Construir a tela Oferta enviada
  - `TelaSucesso` com mascote. "Enviar oferta" faz `router.replace('/ofertar/enviada')` e o botão final volta às abas.
  - Teste: o fluxo Ofertar → Detalhe → Enviar oferta → Oferta enviada funciona do começo ao fim.
  - _Requisitos: 3.7, 12.4, 12.5_

## 7. Fluxo do aluguel

- [ ] 7.1 Construir Checkout
  - Resumo do item e de quem aluga, `OpcaoCard` de entrega/retirada e Pix/cartão (só visual), 5 linhas de valores fixos, aviso de dinheiro guardado, "Confirmar aluguel" fixo embaixo. Sem mascote e sem política de cancelamento.
  - Teste: trocar entrega por retirada não muda nenhum valor. O botão abre a tela de sucesso.
  - _Requisitos: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.8, 13.9_

- [ ] 7.2 Construir Aluguel confirmado
  - `TelaSucesso` com mascote e botão para o detalhe do aluguel (`router.replace`).
  - Teste: o fluxo Início → Detalhe do pedido → Checkout → Aluguel confirmado funciona.
  - _Requisitos: 3.7, 13.7_

- [ ] 7.3 Construir Detalhe do aluguel
  - `RentalTimeline`, dados do item, contato da outra parte e botões "Ver contrato", "Abrir chat" e "Confirmar recebimento" que abrem `FeedbackToast`. Sem mascote.
  - Teste: cada botão mostra o aviso e não muda a etapa.
  - _Requisitos: 14.1, 14.2, 14.3, 14.4, 14.5_

- [ ] 7.4 Construir a tela Aluguéis
  - Abas "Estou alugando" e "Estou ofertando", `Lista` de `AluguelCard` com `StatusBadge` em estados variados.
  - Teste: as duas abas mostram aluguéis diferentes. Tocar abre o detalhe do aluguel certo.
  - _Requisitos: 15.1, 15.2, 15.3, 15.4_

## 8. Perfil e notificações

- [ ] 8.1 Construir a tela Perfil
  - Avatar hexagonal com selo, nome, bairro, nota, nº de aluguéis, avaliações, menu (Notificações, Carteira, Ajuda, Sair). Só "Notificações" navega.
  - Teste: Carteira, Ajuda e Sair não abrem outra tela.
  - _Requisitos: 16.1, 16.2, 16.4_

- [ ] 8.2 Construir a tela Notificações
  - Rota `/notificacoes` com `Lista` de `NotificacaoItem`, com os três estados.
  - Teste: "Notificações" no Perfil abre a lista e voltar retorna ao Perfil.
  - _Requisitos: 16.3, 16.6_

- [ ] 8.3 Construir o Modo_Teste oculto
  - 5 toques seguidos no avatar abrem um painel com "Com dados", "Vazio" e "Carregando", que grava em `listaEstadoStore`.
  - Teste: escolher "Vazio" e depois "Carregando" muda Início, Ofertar, Aluguéis, ofertas do pedido e Notificações.
  - _Requisitos: 16.5, 17.1, 17.4, 17.5_

## 9. Checkpoint de integração

- [ ] 9.1 Percorrer todos os caminhos de navegação no Expo Go
  - Roteiro: Onboarding → Entrar → Início → Detalhe → Checkout → Aluguel confirmado → Detalhe do aluguel; Ofertar → Detalhe → Enviar oferta → Oferta enviada; "+ Pedir" → Criar pedido → Publicado → Detalhe; Aluguéis → Detalhe; Perfil → Notificações. Corrigir qualquer rota quebrada.
  - Teste: as 13 telas são acessíveis em iOS e Android sem erro no console.
  - _Requisitos: 3.7, 22.1_

## 10. Revisão visual e limpeza

- [ ] 10.1 Revisar nas larguras de 360 e 430 pt
  - Verificar cada tela em 360 e 430 pt, em retrato, sem cortes, sobreposições ou barra de ação escondida. Ajustar o que falhar.
  - Teste: as 13 telas e as 3 telas de sucesso revisadas nas duas larguras.
  - _Requisitos: 20.3, 20.4, 20.5_

- [ ] 10.2 Remover a vitrine e revisar contraste e toque
  - Apagar `app/_vitrine.tsx`. Medir o contraste de `text-muted` e dos badges `success` e `danger` com texto branco, e corrigir o que ficar abaixo de 4,5:1 usando só cores da Paleta. Conferir áreas de toque de 44 pt e `accessibilityLabel`.
  - Teste: nenhum texto abaixo de AA e nenhum elemento interativo menor que 44 × 44 pt.
  - _Requisitos: 20.1, 20.2, 20.6_

- [ ] 10.3 Auditar a conformidade da Fase 1
  - Buscar no código: hex fora de `tokens.js`, `fetch` ou `axios`, imports de `Mascote` fora de `EmptyState`, `TelaSucesso` e Onboarding, textos fora de pt-BR, cálculos com valores monetários.
  - Teste: as buscas não encontram ocorrências. `npx tsc --noEmit` passa.
  - _Requisitos: 1.2, 19.1, 19.2, 21.1, 21.2, 22.2, 22.4, 22.8_

- [ ] 10.4 Checklist final dos critérios de aceite
  - Conferir o Requirement 22 item a item no Expo Go e registrar o resultado.
  - Teste: os 8 critérios confirmados em iOS e Android.
  - _Requisitos: 22.1 a 22.8_

## Notas

- **Mascote:** a tarefa 1.6 depende de o arquivo `jabuti.png` estar em `assets/brand/`. Sem ele, os componentes usam o substituto do design.md e a tarefa 10.4 só passa com o arquivo real.
- **Divergências já resolvidas:** ordem das abas, botão "+ Pedir" amarelo e os 6 bairros seguem a Fase 1.
- **Testes automatizados:** não fazem parte desta fase. A verificação é manual no Expo Go e por `tsc`.
