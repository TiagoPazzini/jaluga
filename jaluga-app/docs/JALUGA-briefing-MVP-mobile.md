# JALUGA: briefing do MVP Mobile (design + regras de negócio)

> **Para o Kiro:** este documento é a fonte de verdade para construir o **MVP Mobile do JALUGA** (app iOS e Android). Use-o para gerar `requirements.md`, `design.md` e `tasks.md` no modo spec.
>
> **Legenda:**
> - **[Definido]**: decisão do fundador. Não alterar.
> - **[Sugestão]**: proposta a validar. Pode ser implementada como está, mas deve ficar **configurável** quando for um valor numérico.
> - **[A definir]**: decisão em aberto. Implementar atrás de uma interface ou parâmetro, sem travar o desenvolvimento.

---

## 0. Prompt inicial sugerido

> **Fase atual:** apenas as telas principais, sem regras de negócio. Para essa fase, use `JALUGA-fase1-telas.md`. Este documento é a referência completa para as fases seguintes.

> "Crie a spec do MVP Mobile do JALUGA com base em `JALUGA-briefing-MVP-mobile.md`. Siga o design system da seção 4, as regras de negócio da seção 6 e as máquinas de estado da seção 7. Pagamento, verificação de identidade e entregas devem usar adaptadores simulados (mock) no MVP, atrás de interfaces que permitam trocar por provedores reais depois. Todos os valores numéricos das regras devem vir da tabela de parâmetros (seção 6.1), editável no backoffice."

---

## 1. O produto

**JALUGA** ("já aluga") é um marketplace de **aluguel de itens entre pessoas (P2P)**.

- **Problema [Definido]:** a pessoa precisa de um item, o valor de compra não cabe no bolso naquele momento e ela não vai usar o item de novo.
- **Solução [Definido]:** o cliente **publica a demanda (o item e a data)** e **pessoas da região que têm o item enviam ofertas**.
- **Diferencial [Definido]:** a **demanda invertida**. Quem precisa não procura anúncios. Ele pede uma vez e as ofertas chegam. Quem tem o item não precisa anunciar, basta responder a um pedido real.
- **Slogan:** "Você pede. O bairro oferta."
- **Região inicial [Definido]:** Mogi das Cruzes (SP).
- **Itens [Definido]:** qualquer item transportável.

### 1.1 Objetivo do MVP Mobile
Validar o ciclo completo **pedido → oferta → pagamento retido → entrega/retirada → devolução → liberação → avaliação** com usuários reais em poucos bairros de Mogi. **[Definido]** O MVP é um **app mobile** (iOS e Android). O backoffice pode ser uma aplicação web separada, em fase posterior.

### 1.2 Métricas que o MVP precisa medir
- % de pedidos que recebem pelo menos 1 oferta
- Tempo até a primeira oferta
- % de pedidos que viram aluguel pago
- % de aluguéis concluídos sem disputa
- Nota média das avaliações

---

## 2. Perfis de usuário

| Perfil | Descrição |
|---|---|
| **Visitante** | Vê o onboarding e a página pública de um pedido (link compartilhado). Precisa se cadastrar para agir. |
| **Usuário** | A mesma conta pode **pedir** (locatário) e **ofertar** (locador). [Definido: pessoa para pessoa] |
| **Entregador parceiro** | Cadastrado pelo backoffice. No MVP, atualiza o status da entrega por uma página simples acessada por link seguro. [Sugestão] |
| **Admin (backoffice)** | Aprova verificações, acompanha entregas, resolve disputas, faz repasses, modera conteúdo e edita parâmetros. |

---

## 3. Escopo do MVP

### 3.1 Dentro
1. Onboarding (3 telas de apresentação com o mascote)
2. Cadastro, login e **verificação de identidade**
3. Criar, editar e cancelar **pedido**
4. Feed de **pedidos próximos** para quem quer ofertar
5. Enviar, editar e retirar **oferta**
6. Comparar ofertas e **aceitar uma**
7. **Checkout** com pagamento retido + caução (provedor simulado)
8. **Contrato digital** gerado automaticamente, com aceite das duas partes
9. Escolha entre **entrega por parceiro** e **retirada**
10. **Check-in e check-out com fotos** do estado do item
11. **Chat** entre as partes após o pagamento
12. Devolução, **liberação do valor** e devolução da caução
13. **Avaliações** mútuas
14. **Disputas** mediadas pelo backoffice
15. **Link público compartilhável** de cada pedido
16. **Carteira** do ofertante (saldo e repasses simulados)
17. Notificações **push, in-app e por e-mail**
18. **Backoffice** com parâmetros editáveis

### 3.2 Fora (fase 2)
Destaque pago de ofertas, proteção do item (seguro), rastreio da entrega em tempo real, app do entregador, versão web do produto, notificações por WhatsApp, cadastro de "meus itens" (inventário), expansão para outras cidades, provedores reais de pagamento e verificação.

---

## 4. Design system

### 4.1 Personalidade da marca
- **Amigável, próxima, de vizinho.** Fala com "você", em frases curtas.
- **Confiável.** O mascote **jabuti** representa segurança e cuidado: o item fica protegido como num casco.
- **Simples.** Toda tela tem uma ação principal clara.

### 4.2 Logo
- Wordmark **JALUGA** em fonte de título, peso extra bold.
- **"JA"** em destaque: amarelo `#FFC93C` sobre fundo escuro; roxo `#6C2BD9` sobre fundo claro.
- **"LUGA"**: branco sobre fundo escuro; roxo escuro `#2A0E5C` sobre fundo claro.
- O mascote acompanha o logo apenas no onboarding e na tela de boas-vindas.

### 4.3 Cores [Definido: roxo como principal]

| Token | Hex | Uso |
|---|---|---|
| `primary-50` | `#F8F5FF` | Fundo das páginas |
| `primary-100` | `#EDE4FF` | Fundos de destaque, chips, círculos de ícone |
| `primary-300` | `#B394F0` | Bordas de foco, linhas tracejadas, estados desabilitados |
| `primary-600` | `#6C2BD9` | **Cor principal**: botões, links, ícones ativos |
| `primary-700` | `#5A22B8` | Hover e pressed do botão principal |
| `primary-900` | `#2A0E5C` | Texto principal, header escuro, rodapé |
| `accent-400` | `#FFC93C` | **Destaque**: "JA" do logo, badges, avisos positivos |
| `accent-700` | `#C98A00` | Ícones de aviso sobre fundo claro |
| `text-muted` | `#6E6090` | Texto secundário |
| `border` | `#E3D8FA` | Bordas de cards e inputs |
| `success` | `#1F9D55` | Confirmações |
| `danger` | `#D64545` | Erros, cancelamentos, disputas |
| `white` | `#FFFFFF` | Cards |

**Regras de acessibilidade:**
- **O amarelo nunca é cor de texto sobre fundo claro**, porque fica sem contraste. Use-o como fundo, com texto `primary-900`, ou como texto sobre `primary-900`/`primary-600`.
- Texto `primary-600` sobre branco tem contraste de cerca de 7:1 e pode ser usado em links e botões secundários.
- Seguir **WCAG 2.1 AA** em todos os textos.

### 4.4 Tipografia [Sugestão]
- **Títulos:** Nunito (700 e 800). É arredondada e combina com o mascote.
- **Corpo e interface:** Inter (400, 500 e 600).
- **Escala:** 12 / 14 / 16 (corpo) / 18 / 20 / 24 / 32 / 40 pt. Altura de linha 1,5 no corpo e 1,2 nos títulos.

### 4.5 Forma, espaço e sombra
- **Raio:** 12 pt em cards, 8 pt em inputs e botões, *pill* (999) em chips e badges.
- **Espaçamento:** base de 4 pt (4, 8, 12, 16, 24, 32, 48).
- **Sombra:** suave e levemente roxa, cor `#2A0E5C` com 8% de opacidade, deslocamento 2 e desfoque 8 (no Android, `elevation: 2`).
- **Motivo visual:** **hexágono** (o casco). Usar em badges de nota, marcadores de lista, avatar padrão e no indicador de carregamento.
- **Linha de rota tracejada** em `primary-300` para a linha do tempo do aluguel (entrega → uso → devolução).

### 4.6 Mascote (jabuti)
- **Arquivo:** `jaluga-mascote-jabuti_2.png`, com fundo transparente. Copiar para `assets/brand/`.
- **Onde usar:** onboarding, tela de boas-vindas, estados vazios, sucesso (aluguel confirmado, avaliação enviada) e páginas de erro (404/500).
- **Onde não usar:** formulários, checkout, contrato e telas de disputa. Nelas o foco é a informação.
- **[Sugestão fase 2]:** novas poses (acenando, entregando caixa, comemorando, pensativo).

### 4.7 Componentes
Botão (primário, secundário, fantasma, perigo), Input, Textarea, Select, Date range picker, Upload de fotos com preview, Chip de categoria, Badge de status (uma cor por estado, ver seção 7), Card de pedido, Card de oferta, Comparador de ofertas, Linha do tempo do aluguel, Avatar com selo de verificado, Nota em estrelas, Bolha de chat, Toast, Modal de confirmação, Empty state com mascote, Skeleton de carregamento.

### 4.8 Layout e navegação
- **App mobile** em orientação retrato. Projetar para telas de 360 a 430 pt de largura e respeitar as áreas seguras (notch e barra inferior).
- **Barra de navegação inferior** com **Início · Pedir · Ofertar · Aluguéis · Perfil**. O botão "Pedir" fica central e em destaque (círculo roxo com ícone "+").
- Margem lateral de 16 pt. Áreas de toque com no mínimo 44 × 44 pt.
- Telas de detalhe abrem em pilha, com botão de voltar no topo. Ações principais ficam num botão fixo na parte de baixo.

### 4.9 Microcopy (exemplos)
| Situação | Texto |
|---|---|
| CTA principal | "Pedir um item" |
| CTA de oferta | "Fazer uma oferta" |
| Feed vazio | "Nenhum pedido por perto ainda. Compartilhe o JALUGA com seus vizinhos!" |
| Pedido sem ofertas | "Seu pedido está no ar. Avisamos você quando chegar a primeira oferta." |
| Pagamento retido | "Seu dinheiro fica guardado com a gente e só vai para o vizinho depois da devolução." |
| Aluguel confirmado | "Tudo certo! Agora é só combinar a entrega." |
| Verificação pendente | "Estamos conferindo seus dados. Isso protege você e seus vizinhos." |

---

## 5. Telas

| # | Tela | Conteúdo principal |
|---|---|---|
| 1 | **Onboarding** | 3 telas com o mascote: o que é o JALUGA, como funciona, segurança. CTAs "Criar conta" e "Já tenho conta" |
| 2 | **Cadastro / Login** | E-mail e senha ou link mágico; aceite dos termos e da política de privacidade |
| 3 | **Verificação de identidade** | CPF, data de nascimento, telefone, foto do documento, selfie e endereço (CEP) |
| 4 | **Início** | Abas "Meus pedidos" e "Pedidos perto de mim" |
| 5 | **Criar pedido** (3 passos) | 1) O que você precisa: título, categoria, descrição, foto de referência opcional. 2) Quando: data e hora de início e fim. 3) Onde: endereço salvo e raio. Revisão e publicação |
| 6 | **Detalhe do pedido** (dono) | Status, contador de ofertas, lista e comparador (preço total, caução, distância, nota, entrega/retirada), aceitar oferta, cancelar pedido, compartilhar link |
| 7 | **Detalhe do pedido** (ofertante) | Dados do pedido, bairro e distância aproximada, botão "Fazer uma oferta" |
| 8 | **Enviar oferta** | Preço total do período, valor de reposição do item, fotos reais do item, estado de conservação, aceita entrega e/ou retirada, mensagem. Mostra caução e repasse estimados |
| 9 | **Checkout** | Resumo: aluguel + frete + caução = total. Forma de pagamento (Pix ou cartão simulados). Aceite do contrato |
| 10 | **Aluguel** | Linha do tempo de status, contrato (PDF/visualização), chat, endereço (liberado após pagamento), check-in e check-out com fotos, botões de confirmar entrega e devolução, abrir disputa |
| 11 | **Aluguéis** | Lista dos meus aluguéis como locatário e como locador, com filtro por status |
| 12 | **Avaliação** | Estrelas de 1 a 5 e comentário |
| 13 | **Perfil público** | Nome e inicial do sobrenome, bairro, selo de verificado, nota média, número de aluguéis, avaliações recebidas |
| 14 | **Carteira** | Saldo a liberar, saldo disponível, histórico e saque via Pix (simulado) |
| 15 | **Notificações** | Lista in-app com links para cada evento |
| 16 | **Página pública do pedido** (web simples) | Abre no navegador ou no app (deep link), com imagem de compartilhamento (OG). Mostra item, data e bairro. CTA "Tenho esse item" leva ao cadastro e depois à oferta |
| 17 | **Página do entregador** | Acesso por link seguro: dados da coleta e da entrega, botões "Coletado" e "Entregue" com foto |
| 18 | **Backoffice** (web, fase posterior) | Verificações, pedidos, aluguéis, entregas (atribuir entregador), disputas, repasses, moderação, usuários e **parâmetros** |

---

## 6. Regras de negócio

### 6.1 Parâmetros configuráveis
Todos os valores ficam em uma tabela editável no backoffice. Os valores iniciais são **[Sugestão]** e precisam ser confirmados pelo fundador.

| Parâmetro | Valor inicial |
|---|---|
| `COMISSAO_PERCENTUAL` | **25% sobre o valor total do aluguel [Definido]** |
| `COMISSAO_COBRADA_DE` | `CLIENTE` (somada ao preço) ou `OFERTANTE` (descontada do repasse) **[A definir]**. Nos mocks, usar `CLIENTE` |
| `DIARIA_MINIMA_BASE` | **R$ 15,00 por dia [Definido]** |
| `DIARIA_MINIMA_REGRA` | O mínimo sobe conforme o valor de reposição e o porte do item **[Definido]**. Fórmula **[Sugestão]**: o maior entre R$ 15 × fator de porte (P 1,0 · M 1,5 · G 2,0) e 3% do valor de reposição por dia |
| `COMISSAO_PROMO_ATE` | Data até a qual a comissão do ofertante é 0% (incentivo de lançamento) |
| `RAIO_PADRAO_KM` / `RAIO_MAX_KM` | 5 km / 30 km |
| `ANTECEDENCIA_MIN_HORAS` | 6 h entre a publicação e o início do aluguel |
| `PERIODO_MAX_DIAS` | 30 dias |
| `MAX_OFERTAS_POR_PEDIDO` | 15 |
| `ALERTA_SEM_OFERTA_HORAS` | 12 h |
| `PRAZO_PAGAMENTO_MIN` | 30 min após o aceite |
| `CAUCAO_FAIXAS` | Ver 6.6 **[Definido]** |
| `FRETE_BASE` / `FRETE_POR_KM` | Valores a definir com os entregadores |
| `TOLERANCIA_ATRASO_HORAS` | 2 h |
| `MULTA_ATRASO_PERCENTUAL_DIA` | **20% [Definido]**, sobre a diária, por dia de atraso |
| `ATRASO_VIRA_PERDA_HORAS` | 72 h |
| `CANCELAMENTO_GRATIS_HORAS` | 24 h antes do início **[A definir]** |
| `PRAZO_DISPUTA_HORAS` | 24 h após a devolução |
| `LIBERACAO_AUTOMATICA_HORAS` | 24 h após a devolução, se não houver disputa |
| `JANELA_AVALIACAO_DIAS` | 7 dias |
| `LIMITE_CANCELAMENTOS_OFERTANTE` | 3 em 90 dias (gera suspensão de 30 dias) |

### 6.2 Conta e verificação [Definido: verificação de identidade]
- R1. Só maiores de 18 anos podem se cadastrar.
- R2. Cada CPF pode ter apenas uma conta. O CPF passa por validação de dígitos.
- R3. O usuário pode navegar sem verificação, mas **só pode publicar pedidos, enviar ofertas ou pagar depois de aprovado**.
- R4. A verificação exige foto do documento, selfie, telefone confirmado e endereço com CEP.
- R5. No MVP, a aprovação é **manual no backoffice**, atrás de uma interface `IdentityVerificationProvider` que depois pode ser trocada por um provedor automático. Os status são: `PENDENTE`, `APROVADA` e `REPROVADA` (com motivo e opção de reenvio).
- R6. O perfil público mostra apenas o primeiro nome, a inicial do sobrenome e o bairro.

### 6.3 Pedidos
- R7. Um pedido tem título, categoria, descrição, período (início e fim), endereço de referência e raio. A foto é opcional.
- R8. O início deve ser pelo menos `ANTECEDENCIA_MIN_HORAS` depois da publicação, e o período não pode passar de `PERIODO_MAX_DIAS`.
- R9. Ao publicar, o sistema notifica os usuários verificados cujo endereço está dentro do raio.
- R10. O pedido pode ser editado enquanto não tiver ofertas. Depois da primeira oferta, só a descrição pode mudar.
- R11. Se o pedido não receber ofertas em `ALERTA_SEM_OFERTA_HORAS`, o sistema sugere ao cliente ampliar o raio e alerta o backoffice.
- R12. O pedido expira automaticamente no horário de início se nenhuma oferta tiver sido paga.
- R13. Cada pedido gera um **link público compartilhável**, com bairro e data, sem o endereço exato.
- R14. O texto do pedido passa por moderação: itens proibidos (ver 6.12) podem ser bloqueados ou denunciados.

### 6.4 Ofertas
- R15. Um usuário não pode ofertar no próprio pedido e pode ter só uma oferta ativa por pedido.
- R16. A oferta exige: **preço total do período**, **valor de reposição do item** (usado na caução), **porte do item (P, M ou G)**, pelo menos 2 fotos reais do item, estado de conservação, opções aceitas (entrega e/ou retirada) e uma mensagem opcional.
- R17. Antes de enviar, o ofertante vê o resumo: caução calculada, comissão e repasse estimado.
- R17a. O preço por dia não pode ficar abaixo da diária mínima (`DIARIA_MINIMA_BASE`, ajustada pelo valor e pelo porte do item). O app mostra o mínimo e um preço sugerido enquanto o ofertante digita.
- R18. A oferta pode ser editada ou retirada enquanto não for aceita.
- R19. Quando o pedido atinge `MAX_OFERTAS_POR_PEDIDO`, ele para de receber ofertas.
- R20. O comparador mostra: preço total, preço por dia, caução, distância aproximada, nota do ofertante, número de aluguéis e opções de entrega.

### 6.5 Aceite e pagamento [Definido: pagamento retido]
- R21. Ao aceitar uma oferta, o cliente tem `PRAZO_PAGAMENTO_MIN` para pagar. Nesse período as outras ofertas ficam em espera. Se o prazo vencer, o aceite cai e o pedido volta a ficar aberto.
- R22. O total cobrado é **aluguel + taxa de serviço (se `COMISSAO_COBRADA_DE` = `CLIENTE`) + frete (se houver entrega) + caução**.
- R23. Com o pagamento confirmado: o aluguel passa a `CONFIRMADO`, as outras ofertas são recusadas automaticamente e os ofertantes são avisados.
- R24. Todo o valor fica **retido**. Nada vai para o ofertante antes da devolução.
- R25. No MVP o pagamento é simulado por um `PaymentProvider` com as operações: cobrar, reter, liberar para o ofertante, estornar total ou parcialmente e executar a caução. **[A definir]** o gateway real, que precisa suportar marketplace com split e Pix.
- R26. Cada movimento de dinheiro gera um lançamento num **extrato (ledger)** imutável.

### 6.6 Caução [Definido: caução conforme a escala]
- R27. A caução é calculada sobre o **valor de reposição** declarado pelo ofertante, por faixas **[Definido: mantida a sugestão]**:

| Valor de reposição | Caução |
|---|---|
| Até R$ 200 | 20% |
| R$ 200,01 a R$ 1.000 | 30% |
| R$ 1.000,01 a R$ 3.000 | 40% |
| Acima de R$ 3.000 | 50%, com análise do backoffice |

- R28. A caução é devolvida integralmente na liberação, se não houver disputa. Com disputa, fica retida até a decisão.

### 6.7 Contrato digital [Definido: multa prevista em contrato]
- R29. O contrato é gerado automaticamente a partir de um modelo, com: partes (nome e CPF mascarado), item, fotos, estado de conservação, valor de reposição, período, preço, caução, forma de entrega, multas e política de cancelamento.
- R30. As duas partes precisam aceitar o contrato. O cliente aceita no checkout; o ofertante aceita ao enviar a oferta (aceite prévio das condições).
- R31. O aceite registra data, hora, IP e a versão do contrato. O contrato fica disponível em PDF na tela do aluguel.
- R32. **[A definir]** O texto do contrato precisa de validação jurídica antes do lançamento.

### 6.8 Logística [Definido: entrega intermediada ou retirada]
- R33. O cliente escolhe entre as opções que a oferta aceita: **entrega por parceiro** ou **retirada**.
- R34. **Entrega:** o frete é calculado por `FRETE_BASE + FRETE_POR_KM × distância`. No MVP, o backoffice atribui um entregador parceiro, que atualiza o status pela página do entregador. A devolução segue o mesmo caminho.
- R35. **Retirada:** o endereço exato do ofertante só aparece **depois do pagamento**. Antes disso, só o bairro e a distância aproximada.
- R36. No **check-in** (entrega ao cliente) e no **check-out** (devolução), quem recebe o item registra pelo menos 2 fotos e confirma o estado. Essas fotos são a prova em caso de disputa.

### 6.9 Uso, atraso e perda [Definido: multa]
- R37. Se a devolução não for confirmada até o fim do período + `TOLERANCIA_ATRASO_HORAS`, o aluguel passa a `ATRASADO` e o sistema avisa as duas partes.
- R38. Cada dia de atraso cobra a diária + `MULTA_ATRASO_PERCENTUAL_DIA`. O valor é descontado primeiro da caução.
- R39. Depois de `ATRASO_VIRA_PERDA_HORAS` sem devolução, o backoffice pode marcar o aluguel como **perda**: a caução é executada e a diferença até o valor de reposição é cobrada do cliente.

### 6.10 Devolução, liberação e repasse
- R40. A devolução é concluída quando o ofertante confirma o recebimento com o check-out.
- R41. Se o ofertante não confirmar nem abrir disputa em `LIBERACAO_AUTOMATICA_HORAS` após a entrega da devolução, a liberação é automática.
- R42. Na liberação: o valor do aluguel (menos a comissão, se ela for cobrada do ofertante) vai para a carteira do ofertante, a caução é estornada ao cliente e o aluguel passa a `CONCLUIDO`.
- R43. O saldo disponível pode ser sacado via Pix (simulado no MVP).

### 6.11 Cancelamentos [A definir]
> A política abaixo é só uma referência. Não implementar até o fundador definir.
- R44. **Cliente, até `CANCELAMENTO_GRATIS_HORAS` antes do início:** estorno integral.
- R45. **Cliente, depois desse prazo:** estorno de 50% do aluguel. Os outros 50% vão para o ofertante, menos a comissão. O frete é estornado se o entregador ainda não saiu. A caução é sempre estornada.
- R46. **Ofertante, a qualquer momento antes da entrega:** estorno integral ao cliente e registro no perfil do ofertante. Com `LIMITE_CANCELAMENTOS_OFERTANTE` atingido, o ofertante fica 30 dias sem poder ofertar.
- R47. O pedido de um aluguel cancelado pelo ofertante volta a ficar aberto, se ainda houver prazo.

### 6.12 Itens permitidos e regras por categoria
- R48. **Permitido [Definido]:** qualquer item transportável.
- R49. **Proibido [Sugestão]:** armas e munições, drogas e medicamentos controlados, itens ilegais, falsificados ou roubados, animais, alimentos perecíveis, produtos inflamáveis ou perigosos, veículos motorizados que exigem habilitação, imóveis e serviços.
- R50. **Categorias iniciais:** Ferramentas e casa · Festas e eventos · Viagem e lazer · Bebê e família · Mudança e transporte · Tecnologia e criação · Saúde e recuperação · Ocasiões especiais (roupas e fantasias) · Outros.
- R51. **Regras específicas [Sugestão]:**
  - *Cadeirinhas de carro e bebê conforto:* o ofertante declara que o item nunca sofreu acidente e está dentro da validade.
  - *Roupas e fantasias:* o ofertante declara que o item foi higienizado.
  - *Saúde e recuperação:* aviso de que o JALUGA não substitui orientação médica.

### 6.13 Chat e proteção contra desintermediação
- R52. O chat só abre **depois do pagamento** e fica vinculado ao aluguel.
- R53. Antes do pagamento, telefones, e-mails e links nos textos de pedido e oferta são **mascarados** automaticamente.
- R54. As mensagens ficam guardadas e podem ser usadas como prova em disputas.

### 6.14 Avaliações [Sugestão]
- R55. Depois da conclusão, cada parte pode avaliar a outra (1 a 5 estrelas e comentário) em até `JANELA_AVALIACAO_DIAS`.
- R56. As avaliações são **cegas**: só aparecem quando as duas partes avaliam ou quando o prazo acaba.
- R57. O perfil mostra a nota média e o número de aluguéis concluídos.

### 6.15 Disputas
- R58. O ofertante pode abrir uma disputa por dano ou falta de peças em até `PRAZO_DISPUTA_HORAS` após a devolução. Qualquer parte pode abrir uma disputa por atraso, perda ou item diferente do anunciado.
- R59. A disputa exige descrição e fotos. O backoffice compara as fotos de check-in e check-out e o chat.
- R60. Decisões possíveis: devolver a caução, executá-la total ou parcialmente, ou cobrar valor adicional até o valor de reposição. As partes são notificadas com a justificativa.

### 6.16 Notificações
Enviadas por push, in-app e por e-mail para: novo pedido no raio, nova oferta, oferta aceita ou recusada, pagamento confirmado, entregador a caminho, item entregue, lembrete de devolução (24 h e 2 h antes), atraso, devolução confirmada, valor liberado, pedido de avaliação, disputa aberta ou decidida, verificação aprovada ou reprovada.

### 6.17 Privacidade e segurança (LGPD)
- R61. Documentos e selfies ficam em armazenamento privado e criptografado, com acesso só por URLs temporárias e apenas para o backoffice.
- R62. O CPF aparece sempre mascarado (ex.: `***.456.789-**`).
- R63. O usuário pode pedir a exclusão da conta. Os dados pessoais são anonimizados, mas os registros financeiros e os contratos ficam guardados pelo prazo legal.
- R64. Todas as ações do backoffice ficam registradas em log de auditoria.

---

## 7. Máquinas de estado

### 7.1 Pedido
```
ABERTO ──(oferta aceita)──> AGUARDANDO_PAGAMENTO ──(pago)──> FECHADO
  │                              │
  │                              └─(prazo vencido)──> ABERTO
  ├─(cliente cancela)──> CANCELADO
  └─(início sem pagamento)──> EXPIRADO
```

### 7.2 Oferta
```
ENVIADA ──(cliente aceita)──> ACEITA ──(pago)──> CONFIRMADA
  │                             └─(prazo vencido)──> ENVIADA
  ├─(ofertante retira)──> RETIRADA
  ├─(outra oferta paga)──> RECUSADA
  └─(pedido expira/cancela)──> EXPIRADA
```

### 7.3 Aluguel
```
CONFIRMADO ──> EM_ENTREGA* ──> EM_USO ──> EM_DEVOLUCAO* ──> DEVOLVIDO ──> CONCLUIDO
     │                            │                              │
     └─> CANCELADO                └─> ATRASADO ──> PERDA          └─> EM_DISPUTA ──> CONCLUIDO
* só quando a opção é entrega; na retirada, CONFIRMADO vai direto para EM_USO no check-in
```

**Cores dos badges:** Aberto/Enviada = `primary-100` · Aguardando pagamento = `accent-400` · Confirmado/Em uso = `primary-600` · Concluído = `success` · Atrasado/Disputa/Cancelado = `danger` · Expirado = cinza.

---

## 8. Modelo de dados (resumo)

| Entidade | Campos principais |
|---|---|
| `User` | id, nome, email, telefone, cpf (criptografado), data_nascimento, status_verificacao, nota_media, total_alugueis, suspenso_ate |
| `Address` | user_id, cep, rua, numero, bairro, cidade, lat, lng |
| `IdentityVerification` | user_id, doc_url, selfie_url, status, motivo, revisado_por |
| `Category` | id, nome, regras_especificas, ativa |
| `Request` (pedido) | id, user_id, titulo, categoria_id, descricao, foto_url, inicio, fim, address_id, raio_km, status, slug_publico |
| `Offer` | id, request_id, user_id, preco_total, valor_reposicao, caucao, fotos, conservacao, aceita_entrega, aceita_retirada, mensagem, status |
| `Rental` (aluguel) | id, request_id, offer_id, cliente_id, ofertante_id, modalidade (ENTREGA/RETIRADA), status, inicio, fim |
| `Contract` | rental_id, versao_modelo, conteudo, aceite_cliente_em, aceite_ofertante_em, ip |
| `Payment` | rental_id, valor_aluguel, frete, caucao, comissao, status, provider_ref |
| `LedgerEntry` | rental_id, user_id, tipo, valor, criado_em (imutável) |
| `Delivery` | rental_id, sentido (IDA/VOLTA), entregador_id, status, token_acesso |
| `ConditionReport` | rental_id, tipo (CHECKIN/CHECKOUT), fotos, observacao, autor_id |
| `Message` | rental_id, autor_id, texto, criado_em |
| `Review` | rental_id, autor_id, avaliado_id, nota, comentario, publicada_em |
| `Dispute` | rental_id, aberta_por, motivo, fotos, status, decisao, valor_decidido |
| `Wallet` / `Payout` | user_id, saldo_pendente, saldo_disponivel / valor, chave_pix, status |
| `Notification` | user_id, tipo, payload, lida |
| `Config` | chave, valor, atualizado_por |

---

## 9. Stack técnica [Sugestão: Kiro pode propor alternativas]

- **App:** React Native + Expo (TypeScript), Expo Router para navegação
- **UI:** NativeWind (Tailwind para React Native), com os tokens da seção 4 no tema; ícones Lucide; fontes via `@expo-google-fonts`
- **Backend (fase 2):** API em Node.js + TypeScript
- **Notificações push:** Expo Notifications
- **Backoffice:** aplicação web separada (fase posterior)
- **Banco:** PostgreSQL + Prisma
- **Autenticação:** Amazon Cognito ou Auth.js
- **Arquivos:** Amazon S3 (bucket privado para documentos e público para fotos de itens)
- **E-mail:** Amazon SES
- **Geolocalização:** CEP → coordenadas via Amazon Location Service; distância em linha reta no MVP
- **Rotinas agendadas:** expiração de pedidos e aceites, atrasos, liberação automática (Amazon EventBridge Scheduler ou cron)
- **Hospedagem da API:** AWS (ex.: Lambda + API Gateway ou App Runner)
- **Distribuição do app:** Expo EAS Build (TestFlight e Google Play testes internos)
- **Testes:** Jest (regras de negócio) e Maestro ou Detox (fluxos do app)
- **Adaptadores com implementação mock:** `PaymentProvider`, `IdentityVerificationProvider`, `DeliveryProvider`, `NotificationProvider`

**Dados de teste (seed):** usuários fictícios em bairros de Mogi das Cruzes (Centro, Mogilar, Vila Oliveira, Braz Cubas, César de Souza, Jundiapeba, Socorro), pedidos e ofertas em todas as categorias e aluguéis em cada status.

---

## 10. Requisitos de aceite (EARS)

**Verificação**
- IF o usuário não estiver com verificação `APROVADA` THEN THE SYSTEM SHALL bloquear publicar pedido, enviar oferta e pagar, e mostrar o caminho para concluir a verificação.

**Pedidos**
- WHEN um pedido é publicado THE SYSTEM SHALL notificar os usuários verificados dentro do raio, exceto o autor.
- IF o início do pedido for menor que `ANTECEDENCIA_MIN_HORAS` THEN THE SYSTEM SHALL impedir a publicação e explicar o motivo.
- WHEN o horário de início chega sem oferta paga THE SYSTEM SHALL marcar o pedido como `EXPIRADO` e as ofertas como `EXPIRADA`.

**Ofertas e pagamento**
- WHEN o cliente aceita uma oferta THE SYSTEM SHALL abrir o checkout com o total (aluguel + frete + caução) e reservar a oferta por `PRAZO_PAGAMENTO_MIN`.
- WHEN o pagamento é confirmado THE SYSTEM SHALL criar o aluguel, gerar o contrato, recusar as outras ofertas e notificar todos os envolvidos.
- WHILE o aluguel não estiver `CONCLUIDO` THE SYSTEM SHALL manter todo o valor retido.

**Logística**
- WHILE o pagamento não estiver confirmado THE SYSTEM SHALL esconder o endereço exato do ofertante.
- WHEN o item é entregue ou devolvido THE SYSTEM SHALL exigir pelo menos 2 fotos de quem recebe.

**Devolução e liberação**
- WHEN o ofertante confirma a devolução sem disputa THE SYSTEM SHALL liberar o aluguel menos a comissão para a carteira do ofertante e estornar a caução ao cliente.
- IF a devolução não for confirmada até o fim + `TOLERANCIA_ATRASO_HORAS` THEN THE SYSTEM SHALL marcar o aluguel como `ATRASADO` e calcular a multa diária.
- IF uma disputa for aberta THEN THE SYSTEM SHALL reter a caução até a decisão do backoffice.

**Chat**
- IF o texto de um pedido ou oferta tiver telefone, e-mail ou link antes do pagamento THEN THE SYSTEM SHALL mascarar esses dados.

---

## 11. Ordem de construção sugerida

0. **Fase 1 (atual): telas principais sem regras de negócio**, com dados simulados (ver `JALUGA-fase1-telas.md`)
1. **Base:** design system finalizado, autenticação, backend e seed
2. **Conta:** cadastro, verificação (com aprovação no backoffice), perfil e endereço
3. **Pedidos e ofertas:** criar pedido, feed por raio, enviar oferta, comparador, link público
4. **Transação:** aceite, checkout mock, ledger, contrato, chat
5. **Logística e ciclo:** entrega/retirada, página do entregador, check-in/check-out, devolução, liberação, carteira
6. **Confiança:** atrasos e multas, cancelamentos, disputas, avaliações
7. **Operação:** backoffice web, parâmetros, notificações push e e-mail, métricas

---

## 12. Decisões em aberto (o fundador precisa definir)

1. ~~Percentual da comissão~~ → **25% [Definido]**. Falta definir: quem paga (cliente ou ofertante) e se haverá promoção de lançamento
2. ~~Faixas de caução~~ → **mantida a sugestão** · ~~Multa por atraso~~ → **20%**
2a. Fórmula final da diária mínima por valor e porte (base de R$ 15/dia definida)
3. Valores de frete e como os entregadores parceiros serão contratados
4. Gateway de pagamento real (marketplace com split, retenção e Pix)
5. Provedor de verificação de identidade automática
6. Texto do contrato e dos termos de uso (validação jurídica)
7. Política de cancelamento final
8. Bairros de lançamento do piloto
