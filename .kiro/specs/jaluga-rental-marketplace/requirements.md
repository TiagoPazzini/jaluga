# Requirements Document

## Introduction

JALUGA ("já aluga") é um aplicativo mobile de aluguel de itens entre pessoas (P2P), com o slogan "Você pede. O bairro oferta.". O diferencial é a demanda invertida: o Cliente publica um Pedido (item, categoria, período, localização ou raio) e os Ofertantes da região que têm o item respondem com Ofertas contendo preço, condições, fotos, Caução e opção de entrega ou retirada.

O MVP opera em Mogi das Cruzes (SP), começando por poucos bairros, e aceita qualquer item transportável. Imóveis, veículos, itens ilegais ou perigosos e itens que exigem licença não são aceitos. A confiança entre as partes se apoia em verificação de identidade, pagamento retido (escrow), contrato digital com multa, caução escalonada, fotos de check-in e check-out, avaliações mútuas e disputa mediada pelo Backoffice.

Este documento deriva os requisitos do design aprovado (design.md) e do briefing de produto. Valores ainda não decididos (percentual de comissão, escala de caução, multas, raio padrão, prazos e limites) são tratados como Parâmetros configuráveis, sem valor fixo definido aqui.

## Glossary

- **SYSTEM**: Conjunto formado pelo App_Mobile, pela API e pelos módulos de backend do JALUGA (autenticação, identidade, pedidos, correspondência, ofertas, aluguéis, pagamentos, contratos, logística, disputas, mensagens, notificações, parâmetros e analytics).
- **App_Mobile**: Aplicativo Android e iOS (código único) usado por Clientes e Ofertantes.
- **Backoffice**: Aplicação web usada por Administradores para moderar, resolver disputas, revisar verificações e acompanhar repasses.
- **Usuario**: Pessoa com conta no JALUGA. A mesma conta pode atuar como Cliente e como Ofertante.
- **Cliente**: Usuario (locatário) que publica Pedidos e aluga itens.
- **Ofertante**: Usuario (locador) que responde Pedidos com Ofertas e aluga seus itens.
- **Entregador**: Parceiro que coleta e entrega itens; no MVP é acionado e acompanhado pelo Backoffice e por notificações, sem aplicativo próprio.
- **Administrador**: Usuario do Backoffice com perfil de acesso administrativo.
- **Pedido**: Demanda publicada pelo Cliente, com status ABERTO, FECHADO, CANCELADO ou EXPIRADO.
- **Oferta**: Resposta de um Ofertante a um Pedido, com status ENVIADA, ACEITA, RECUSADA, DESISTIDA ou EXPIRADA.
- **Aluguel**: Contrato de uso originado por uma Oferta aceita, com status AGUARDANDO_PAGAMENTO, CONFIRMADO, EM_ENTREGA, EM_USO, EM_DEVOLUCAO, CONCLUIDO, EM_DISPUTA ou CANCELADO.
- **Verificacao_Identidade**: Estado de identidade do Usuario: NAO_INICIADA, EM_ANALISE, VERIFICADA ou REJEITADA.
- **Provedor_Identidade**: Serviço externo de verificação de documento e selfie, acessado pela interface IdentityProvider.
- **Gateway_Pagamento**: Serviço externo de pagamento com retenção e split, com Pix e cartão, acessado pela interface PaymentProvider.
- **Provedor_Entrega**: Mecanismo de acionamento de Entregadores, acessado pela interface DeliveryProvider.
- **Escrow**: Retenção dos valores pagos pelo Cliente até a conclusão do Aluguel.
- **Caucao**: Valor retido além do preço do aluguel, definido por escala conforme o valor estimado do item.
- **Escala_Caucao**: Parâmetro versionado que associa faixas de valor estimado do item a valor ou percentual mínimo de Caucao.
- **Comissao**: Valor retido pela plataforma sobre o preço do aluguel, calculado pelo percentual vigente.
- **Ledger**: Livro-razão interno de partidas dobradas e lançamentos imutáveis que registra todo movimento financeiro.
- **Lancamento**: Registro do Ledger com conta de débito, conta de crédito, valor em centavos e chave de idempotência.
- **Repasse**: Pagamento ao Ofertante (ou ao Entregador) após a conclusão do Aluguel.
- **Contrato**: Documento digital do Aluguel, gerado de um modelo versionado, com hash de conteúdo e registro de aceite.
- **Disputa**: Procedimento aberto por atraso, dano ou perda, decidido pelo Backoffice.
- **Check_In**: Fotos do estado do item na retirada ou entrega.
- **Check_Out**: Fotos do estado do item na devolução.
- **Link_Publico**: URL compartilhável de um Pedido, identificada por token opaco.
- **Area_Aproximada**: Bairro do Pedido exibido a terceiros no lugar da localização exata.
- **Parametro_Config**: Valor de configuração versionado, com data de vigência e escopo (global, papel ou região).
- **Motor_Correspondencia**: Módulo que localiza Ofertantes elegíveis para um Pedido por consulta geoespacial.
- **Evento_Analytics**: Registro de um acontecimento de negócio, com identificadores internos e carimbo de tempo.
- **Tokens_Tema**: Valores centralizados de identidade visual (cores, tipografia, espaçamento) usados pelo App_Mobile.
- **Fase_2**: Itens fora do MVP: destaque pago de ofertas, proteção opcional do item, rastreio de entrega em tempo real, aplicativo próprio do Entregador, expansão para outras cidades, versão web completa para Clientes e Ofertantes e taxa de entrega como receita complementar.

## Requirements

### Requirement 1: Cadastro e autenticação

**User Story:** Como usuário, quero criar uma conta e entrar no app com telefone ou e-mail, para que eu possa pedir e ofertar itens com segurança.

#### Acceptance Criteria

1. WHEN um visitante se registra com telefone ou e-mail, THE SYSTEM SHALL enviar um código de confirmação por SMS ou e-mail e criar a conta somente após a validação do código.
2. IF o código de confirmação informado é inválido ou expirou, THEN THE SYSTEM SHALL rejeitar a validação e manter a conta não criada.
3. IF o telefone ou o e-mail informado já pertence a outra conta, THEN THE SYSTEM SHALL rejeitar o cadastro.
4. WHEN um Usuario realiza login com credenciais válidas, THE SYSTEM SHALL emitir um token de acesso de curta duração e um token de renovação.
5. WHEN um Usuario renova a sessão com um token de renovação válido, THE SYSTEM SHALL emitir um novo token de acesso e um novo token de renovação, invalidando o token de renovação anterior.
6. WHEN um Usuario realiza logout, THE SYSTEM SHALL invalidar o token de renovação da sessão.
7. THE SYSTEM SHALL permitir que uma mesma conta atue como Cliente e como Ofertante, com alternância de modo no App_Mobile.
8. WHEN um Usuario atualiza nome, foto, localização padrão ou raio, THE SYSTEM SHALL persistir os novos valores no perfil.
9. IF o Usuario não concede permissão de localização, THEN THE SYSTEM SHALL solicitar endereço ou CEP e geocodificar o valor informado.

### Requirement 2: Verificação de identidade

**User Story:** Como Cliente ou Ofertante, quero que todos os participantes tenham identidade verificada, para que eu possa alugar e ofertar com confiança.

#### Acceptance Criteria

1. WHEN um Usuario inicia a verificação, THE SYSTEM SHALL abrir uma sessão no Provedor_Identidade e definir Verificacao_Identidade como EM_ANALISE após o envio de documento e selfie.
2. IF a Verificacao_Identidade do Usuario não é VERIFICADA, THEN THE SYSTEM SHALL rejeitar a publicação de Pedido com o código IDENTIDADE_NAO_VERIFICADA e sem criar registro.
3. IF a Verificacao_Identidade do Usuario não é VERIFICADA, THEN THE SYSTEM SHALL rejeitar o envio de Oferta com o código IDENTIDADE_NAO_VERIFICADA e sem criar registro.
4. WHEN o Provedor_Identidade envia um resultado com assinatura válida, THE SYSTEM SHALL atualizar a Verificacao_Identidade para VERIFICADA ou REJEITADA.
5. IF o resultado do Provedor_Identidade chega com assinatura inválida, THEN THE SYSTEM SHALL descartar o resultado e registrar a ocorrência.
6. WHEN a Verificacao_Identidade passa a REJEITADA, THE SYSTEM SHALL informar ao Usuario um motivo genérico e permitir novo envio de documentos.
7. WHERE a revisão manual está habilitada, THE SYSTEM SHALL permitir que o Administrador altere a Verificacao_Identidade de um Usuario no Backoffice.
8. THE SYSTEM SHALL armazenar apenas o resultado e a referência externa da verificação, mantendo imagens de documento e selfie somente no Provedor_Identidade.
9. IF o Provedor_Identidade está indisponível, THEN THE SYSTEM SHALL manter o Usuario em EM_ANALISE e repetir a consulta ao provedor.

### Requirement 3: Publicação e gestão de pedidos

**User Story:** Como Cliente, quero publicar, editar e cancelar um pedido do item que preciso, para que ofertantes da minha região me enviem ofertas.

#### Acceptance Criteria

1. WHEN um Cliente com Verificacao_Identidade VERIFICADA publica um Pedido com título, categoria, período e localização, THE SYSTEM SHALL criar o Pedido com status ABERTO, data de expiração, Link_Publico e raio de busca igual ao informado ou, quando omitido, ao Parametro_Config raio_padrao_km.
2. IF a data de início do Pedido é anterior à data atual ou a data de fim é anterior à data de início, THEN THE SYSTEM SHALL rejeitar o Pedido com erro de validação por campo.
3. IF o título do Pedido tem menos de 3 ou mais de 80 caracteres, ou a descrição tem mais de 1000 caracteres, THEN THE SYSTEM SHALL rejeitar o Pedido com erro de validação por campo.
4. IF o raio de busca informado no Pedido está fora do intervalo de 1 a 50 km, THEN THE SYSTEM SHALL rejeitar o Pedido.
5. IF o número de Pedidos ABERTOS do Cliente atinge o limite definido em Parametro_Config, THEN THE SYSTEM SHALL rejeitar a publicação de novo Pedido.
6. WHEN o Cliente edita um Pedido ABERTO sem Oferta aceita, THE SYSTEM SHALL persistir as alterações.
7. IF o Cliente tenta editar um Pedido que não está ABERTO, THEN THE SYSTEM SHALL rejeitar a edição com status 409.
8. WHEN o Cliente cancela um Pedido ABERTO, THE SYSTEM SHALL alterar o status para CANCELADO, alterar as Ofertas ENVIADAS para EXPIRADA e notificar os Ofertantes afetados.
9. WHEN a data de início de um Pedido ABERTO passa sem Oferta aceita, THE SYSTEM SHALL alterar o status do Pedido para EXPIRADO e as Ofertas ENVIADAS para EXPIRADA.
10. THE SYSTEM SHALL permitir somente as transições de status do Pedido definidas no ciclo de vida (ABERTO para FECHADO, CANCELADO ou EXPIRADO) e manter inalterados os Pedidos em estado final.
11. THE SYSTEM SHALL exibir a terceiros somente a Area_Aproximada do Pedido, mantendo a localização exata privada.
12. WHERE o Cliente anexa fotos de referência ao Pedido, THE SYSTEM SHALL armazenar as fotos e exibi-las aos Ofertantes elegíveis.

### Requirement 4: Categorias e itens proibidos

**User Story:** Como administrador da plataforma, quero impedir itens proibidos, para que o marketplace seja seguro e legal.

#### Acceptance Criteria

1. THE SYSTEM SHALL manter uma lista controlada de categorias de itens que não inclui imóveis nem veículos.
2. IF um Pedido ou uma Oferta se enquadra em categoria ou termo proibido (imóveis, veículos, itens ilegais ou perigosos, itens que exigem licença), THEN THE SYSTEM SHALL rejeitar o registro com explicação do motivo.
3. WHEN um Usuario denuncia um Pedido, uma Oferta ou outro Usuario, THE SYSTEM SHALL registrar a denúncia com motivo e disponibilizá-la ao Backoffice.

### Requirement 5: Link público do pedido

**User Story:** Como Cliente, quero compartilhar meu pedido por um link, para que pessoas fora do app possam ofertar e conhecer o JALUGA.

#### Acceptance Criteria

1. WHEN um Pedido é criado, THE SYSTEM SHALL gerar um Link_Publico com token opaco, único e não derivável do identificador do Pedido.
2. WHEN o Link_Publico é acessado, THE SYSTEM SHALL retornar somente título, categoria, período e Area_Aproximada do Pedido.
3. WHEN um visitante abre o Link_Publico em um dispositivo móvel, THE SYSTEM SHALL direcionar o visitante, por deep link, ao App_Mobile ou à loja de aplicativos e, depois, ao cadastro ou ao formulário de Oferta.
4. IF um visitante acessa o formulário de Oferta pelo Link_Publico sem Verificacao_Identidade VERIFICADA, THEN THE SYSTEM SHALL conduzir o visitante ao fluxo de verificação antes de permitir a Oferta.
5. WHEN o número de acessos ao Link_Publico por origem ultrapassa o limite definido em Parametro_Config, THE SYSTEM SHALL rejeitar as requisições excedentes.

### Requirement 6: Correspondência geográfica e notificações

**User Story:** Como Ofertante, quero ser avisado de pedidos próximos, para que eu possa ofertar itens que tenho.

#### Acceptance Criteria

1. WHEN um Pedido é publicado, THE Motor_Correspondencia SHALL notificar os Ofertantes com Verificacao_Identidade VERIFICADA cuja localização está dentro do raio do Pedido.
2. THE Motor_Correspondencia SHALL excluir da notificação o autor do Pedido e os Usuarios que bloquearam ou foram bloqueados pelo autor.
3. WHERE o Ofertante cadastrou itens, THE Motor_Correspondencia SHALL filtrar os Ofertantes pela categoria do Pedido.
4. THE Motor_Correspondencia SHALL limitar as notificações por Pedido e por Usuario aos valores definidos em Parametro_Config.
5. WHEN um novo Ofertante VERIFICADA passa a atender a região de um Pedido ABERTO, THE Motor_Correspondencia SHALL reprocessar a correspondência desse Pedido para esse Ofertante.
6. WHEN um Ofertante VERIFICADA consulta o feed de pedidos próximos, THE SYSTEM SHALL retornar, de forma paginada, os Pedidos ABERTOS dentro do raio informado.
7. WHEN ocorre nova Oferta, nova mensagem, mudança de status ou evento de entrega, THE SYSTEM SHALL enviar notificação push e registrar o evento no feed interno do App_Mobile.
8. IF o envio de uma notificação push falha, THEN THE SYSTEM SHALL repetir o envio com recuo exponencial e remover o token do dispositivo quando o serviço de push o declarar inválido.

### Requirement 7: Alerta de pedido sem ofertas

**User Story:** Como Cliente, quero ser orientado quando meu pedido não recebe ofertas, para que eu possa ampliar a busca.

#### Acceptance Criteria

1. WHEN um Pedido ABERTO permanece sem Ofertas após T_SEM_OFERTA horas, THE SYSTEM SHALL alertar o Backoffice.
2. WHEN um Pedido ABERTO permanece sem Ofertas após T_SEM_OFERTA horas, THE SYSTEM SHALL sugerir ao Cliente ampliar o raio ou ajustar as datas.
3. IF o Motor_Correspondencia não encontra Ofertantes elegíveis, THEN THE SYSTEM SHALL manter o Pedido publicado com status ABERTO.

### Requirement 8: Envio e gestão de ofertas

**User Story:** Como Ofertante, quero responder a um pedido com uma oferta completa, para que o Cliente possa comparar e escolher.

#### Acceptance Criteria

1. WHEN um Ofertante VERIFICADA envia uma Oferta, THE SYSTEM SHALL exigir preço total maior que zero, ao menos uma foto do item, valor da Caucao e ao menos uma opção entre retirada e entrega.
2. IF algum campo obrigatório da Oferta está ausente ou inválido, THEN THE SYSTEM SHALL rejeitar a Oferta com erro de validação por campo.
3. IF a Caucao informada é menor que o mínimo definido pela Escala_Caucao vigente, THEN THE SYSTEM SHALL rejeitar a Oferta.
4. IF o Ofertante já possui Oferta ENVIADA para o mesmo Pedido, THEN THE SYSTEM SHALL rejeitar a nova Oferta com status 409.
5. IF o Ofertante é o autor do Pedido, THEN THE SYSTEM SHALL rejeitar a Oferta.
6. IF o Pedido não está ABERTO, THEN THE SYSTEM SHALL rejeitar a Oferta com status 409.
7. WHEN uma Oferta é criada, THE SYSTEM SHALL notificar o Cliente autor do Pedido.
8. WHEN o Ofertante retira uma Oferta ENVIADA, THE SYSTEM SHALL alterar o status da Oferta para DESISTIDA.
9. THE SYSTEM SHALL exibir o conteúdo das Ofertas de um Pedido somente ao Cliente dono do Pedido e, para cada Oferta, ao Ofertante autor dela.
10. WHEN o Cliente consulta as Ofertas de um Pedido, THE SYSTEM SHALL apresentar preço, distância e avaliação média de cada Ofertante.
11. THE SYSTEM SHALL permitir somente as transições de status da Oferta definidas no ciclo de vida e manter inalteradas as Ofertas em estado final.

### Requirement 9: Aceite de oferta

**User Story:** Como Cliente, quero aceitar uma oferta e fechar o pedido, para que o aluguel prossiga com o ofertante escolhido.

#### Acceptance Criteria

1. WHEN o Cliente aceita uma Oferta ENVIADA de um Pedido ABERTO, THE SYSTEM SHALL executar em uma única transação: alterar a Oferta para ACEITA, alterar o Pedido para FECHADO, alterar as demais Ofertas ENVIADAS para RECUSADA e criar um Aluguel com status AGUARDANDO_PAGAMENTO.
2. WHEN as demais Ofertas são recusadas pelo aceite, THE SYSTEM SHALL notificar os Ofertantes dessas Ofertas.
3. IF o aceite é solicitado para Pedido já encerrado, Oferta retirada ou Oferta já decidida, THEN THE SYSTEM SHALL rejeitar o aceite com status 409 sem alterar nenhum estado.
4. THE SYSTEM SHALL manter, para cada Pedido, no máximo uma Oferta ACEITA e no máximo um Aluguel, e manter o Aluguel existente se e somente se uma Oferta foi aceita.
5. WHEN o Cliente aceita uma Oferta, THE SYSTEM SHALL gravar no Aluguel o percentual de Comissao, a Escala_Caucao e os valores de multa vigentes naquele momento.
6. WHEN o Cliente recusa explicitamente uma Oferta ENVIADA, THE SYSTEM SHALL alterar o status da Oferta para RECUSADA e notificar o Ofertante.

### Requirement 10: Pagamento retido

**User Story:** Como Cliente, quero pagar pelo app com meu valor protegido, para que eu só libere o dinheiro após a devolução.

#### Acceptance Criteria

1. WHEN uma Oferta é aceita, THE SYSTEM SHALL criar no Gateway_Pagamento uma cobrança igual ao preço do aluguel somado à Caucao e, quando a entrega é escolhida, ao frete, com Pix ou cartão.
2. WHEN o Gateway_Pagamento confirma o pagamento, THE SYSTEM SHALL manter os valores em Escrow, com o valor do aluguel e a Caucao em contas separadas do Ledger.
3. WHILE o Aluguel está AGUARDANDO_PAGAMENTO e o prazo de pagamento não expirou, THE SYSTEM SHALL permitir que o Cliente tente outro método de pagamento.
4. IF o pagamento é recusado e o prazo de pagamento definido em Parametro_Config expira, THEN THE SYSTEM SHALL alterar o Aluguel para CANCELADO e liberar a Oferta.
5. IF o pagamento do Aluguel não está retido, THEN THE SYSTEM SHALL manter o Aluguel em AGUARDANDO_PAGAMENTO ou CANCELADO.
6. WHEN um Aluguel é cancelado antes do uso após o pagamento, THE SYSTEM SHALL reembolsar o Cliente conforme a política de reembolso definida em Parametro_Config.
7. THE SYSTEM SHALL delegar ao Gateway_Pagamento o tratamento de dados de cartão, sem armazenar número, validade ou código de segurança.
8. WHEN o Gateway_Pagamento envia um webhook, THE SYSTEM SHALL validar a assinatura e rejeitar o evento quando a assinatura é inválida.

### Requirement 11: Caução escalonada

**User Story:** Como Ofertante, quero uma caução proporcional ao valor do item, para que meu item esteja protegido.

#### Acceptance Criteria

1. THE SYSTEM SHALL determinar a Caucao mínima de uma Oferta pela Escala_Caucao vigente, a partir do valor estimado do item.
2. WHEN um Aluguel é CONCLUIDO sem Disputa, THE SYSTEM SHALL devolver ao Cliente o valor integral da Caucao cobrada.
3. WHILE o Aluguel está EM_DISPUTA, THE SYSTEM SHALL manter a Caucao retida em Escrow.
4. WHEN o Backoffice decide uma Disputa, THE SYSTEM SHALL distribuir a Caucao entre Cliente e Ofertante conforme a decisão registrada.

### Requirement 12: Comissão e repasse

**User Story:** Como Ofertante, quero receber o valor do aluguel após a devolução, para que eu seja pago de forma justa e previsível.

#### Acceptance Criteria

1. THE SYSTEM SHALL calcular o valor da Comissao como o percentual gravado no Aluguel multiplicado pelo preço do aluguel, arredondado em centavos em um único ponto do código, com resultado maior ou igual a zero e menor ou igual ao preço do aluguel.
2. THE SYSTEM SHALL obter o percentual de Comissao do Parametro_Config vigente para o papel e o período, permitindo valor zero para Ofertantes durante promoção de lançamento.
3. WHEN Cliente e Ofertante confirmam a devolução e não existe Disputa ABERTA ou EM_ANALISE para o Aluguel, THE SYSTEM SHALL liberar ao Ofertante o Repasse igual ao preço do aluguel menos a Comissao.
4. IF existe Disputa ABERTA ou EM_ANALISE para o Aluguel, THEN THE SYSTEM SHALL manter retidos o Repasse e a Caucao até a decisão do Backoffice.
5. IF uma das partes não confirma a devolução dentro do prazo definido em Parametro_Config, THEN THE SYSTEM SHALL encaminhar o Aluguel para análise do Backoffice sem liberar o Repasse.
6. IF um Repasse falha, THEN THE SYSTEM SHALL marcar o Repasse como FALHOU, repetir a operação e alertar o Backoffice.
7. WHEN o frete de uma entrega é liberado, THE SYSTEM SHALL repassar o valor do frete ao Entregador.
8. WHEN um Aluguel atinge o estado CONCLUIDO ou CANCELADO, THE SYSTEM SHALL ter distribuído todo o valor em Escrow entre Ofertante, plataforma, Entregador e Cliente, deixando saldo de Escrow igual a zero.

### Requirement 13: Livro-razão e idempotência financeira

**User Story:** Como administrador financeiro, quero um registro contábil rastreável e seguro contra duplicidades, para que o dinheiro nunca seja perdido ou contado duas vezes.

#### Acceptance Criteria

1. WHEN ocorre um movimento financeiro, THE SYSTEM SHALL registrar um Lancamento de partidas dobradas, com a soma de débitos igual à soma de créditos para cada Aluguel.
2. THE SYSTEM SHALL manter os Lancamentos imutáveis e registrar correções como novos Lancamentos.
3. THE SYSTEM SHALL manter o saldo de Escrow de cada Aluguel maior ou igual a zero.
4. WHEN uma operação financeira é repetida com a mesma chave de idempotência, THE SYSTEM SHALL produzir o mesmo estado do Ledger que uma única execução.
5. WHEN um webhook do Gateway_Pagamento é entregue mais de uma vez ou fora de ordem, THE SYSTEM SHALL aplicar o efeito financeiro uma única vez.
6. IF o Ledger diverge do Gateway_Pagamento na conciliação, THEN THE SYSTEM SHALL gerar um alerta de conciliação no Backoffice.

### Requirement 14: Contrato digital

**User Story:** Como Cliente e Ofertante, quero um contrato digital com multa e caução, para que as condições do aluguel fiquem claras e registradas.

#### Acceptance Criteria

1. WHEN o pagamento de um Aluguel é retido, THE SYSTEM SHALL gerar o Contrato a partir do modelo versionado vigente, com partes, item, período, preço, Caucao, multas por atraso, dano e perda, condições da Oferta e regras de entrega e devolução.
2. WHEN o Contrato é gerado, THE SYSTEM SHALL solicitar o aceite do Cliente e do Ofertante e registrar, para cada aceite, usuário, data e hora, versão do modelo, IP e dispositivo.
3. WHEN o pagamento está retido e o Cliente e o Ofertante aceitaram o Contrato, THE SYSTEM SHALL alterar o Aluguel para CONFIRMADO.
4. WHEN ao menos uma das partes aceitou o Contrato, THE SYSTEM SHALL manter inalterado o hash do conteúdo e armazenar o PDF do Contrato.
5. THE SYSTEM SHALL obter os valores de multa do Contrato de Parametro_Config, sem valores fixos no código.

### Requirement 15: Ciclo de vida do aluguel

**User Story:** Como Cliente e Ofertante, quero acompanhar cada etapa do aluguel, para que eu saiba o que falta fazer.

#### Acceptance Criteria

1. THE SYSTEM SHALL permitir somente as transições de status do Aluguel definidas no ciclo de vida e manter inalterados os Aluguéis em estado final.
2. WHEN um Entregador é acionado para o Aluguel CONFIRMADO, THE SYSTEM SHALL alterar o status para EM_ENTREGA.
3. WHEN a entrega é confirmada com fotos de Check_In ou a retirada é confirmada pelas duas partes, THE SYSTEM SHALL alterar o Aluguel para EM_USO.
4. WHEN o Cliente inicia a devolução de um Aluguel EM_USO, THE SYSTEM SHALL alterar o status para EM_DEVOLUCAO.
5. WHEN Cliente e Ofertante confirmam a devolução de um Aluguel EM_DEVOLUCAO, THE SYSTEM SHALL alterar o status para CONCLUIDO.
6. WHEN uma das partes cancela um Aluguel CONFIRMADO antes do uso, THE SYSTEM SHALL alterar o status para CANCELADO e aplicar a política de reembolso configurada.
7. THE SYSTEM SHALL exigir a confirmação das duas partes nas etapas de retirada ou entrega e de devolução.
8. IF faltam fotos obrigatórias ou a confirmação de uma das partes, THEN THE SYSTEM SHALL manter o Aluguel na etapa atual e enviar lembretes às partes.

### Requirement 16: Entrega por parceiro

**User Story:** Como Cliente, quero receber o item em casa por um entregador parceiro, para que eu não precise buscar o item.

#### Acceptance Criteria

1. WHEN o Cliente escolhe a entrega, THE SYSTEM SHALL calcular o frete em função da distância pela tabela de frete definida em Parametro_Config.
2. WHEN um Aluguel com entrega é CONFIRMADO, THE SYSTEM SHALL acionar um Entregador, por meio do Provedor_Entrega, para a coleta com o Ofertante e a entrega ao Cliente.
3. WHEN o Cliente inicia a devolução de um Aluguel com entrega, THE SYSTEM SHALL acionar um Entregador para a coleta com o Cliente e a entrega ao Ofertante.
4. WHEN o Provedor_Entrega informa uma mudança de status, THE SYSTEM SHALL registrar o status da entrega (SOLICITADA, ATRIBUIDA, COLETADA, ENTREGUE ou FALHOU) e notificar as partes.
5. IF nenhum Entregador aceita a entrega ou a entrega falha, THEN THE SYSTEM SHALL alertar o Backoffice, notificar as partes e reatribuir a entrega.
6. IF nenhum Entregador é atribuído dentro do prazo definido em Parametro_Config, THEN THE SYSTEM SHALL oferecer ao Cliente a troca para retirada com estorno do frete ou o cancelamento sem penalidade, conforme a política configurada.
7. THE SYSTEM SHALL permitir que o Administrador cadastre, ative e desative Entregadores no Backoffice.

### Requirement 17: Retirada e liberação de endereço

**User Story:** Como Cliente, quero buscar o item diretamente com o ofertante, para que eu economize o frete.

#### Acceptance Criteria

1. WHEN o Cliente escolhe a retirada, THE SYSTEM SHALL liberar o endereço ou ponto de encontro somente após o pagamento do Aluguel ser retido.
2. WHILE o pagamento do Aluguel não está retido, THE SYSTEM SHALL exibir a terceiros somente a Area_Aproximada.
3. THE SYSTEM SHALL manter o campo endereco_liberado_em do Aluguel preenchido se e somente se o pagamento está retido.
4. WHEN o endereço ou ponto de encontro é liberado, THE SYSTEM SHALL exibir no App_Mobile orientações de segurança para o encontro.

### Requirement 18: Fotos de check-in e check-out

**User Story:** Como Cliente e Ofertante, quero fotos do estado do item na entrega e na devolução, para que haja evidência em caso de disputa.

#### Acceptance Criteria

1. WHEN o item é retirado ou entregue, THE SYSTEM SHALL exigir ao menos uma foto de Check_In antes de o Aluguel passar a EM_USO.
2. WHEN o item é devolvido, THE SYSTEM SHALL exigir ao menos uma foto de Check_Out antes de o Aluguel passar a CONCLUIDO por devolução.
3. WHEN uma foto é enviada, THE SYSTEM SHALL registrar autor, fase, etapa e data e hora da captura.
4. IF um arquivo enviado excede o tamanho máximo ou não é de um tipo de imagem aceito, THEN THE SYSTEM SHALL rejeitar o arquivo com mensagem de erro.
5. IF o envio de fotos falha por instabilidade de rede, THEN THE App_Mobile SHALL manter o rascunho e repetir o envio automaticamente.

### Requirement 19: Disputas

**User Story:** Como Cliente ou Ofertante, quero abrir uma disputa por atraso, dano ou perda, para que o backoffice resolva o caso com base em evidências.

#### Acceptance Criteria

1. WHEN uma parte reporta atraso, dano ou perda de um Aluguel EM_USO ou EM_DEVOLUCAO, THE SYSTEM SHALL abrir uma Disputa e alterar o Aluguel para EM_DISPUTA.
2. WHILE o Aluguel está EM_DISPUTA, THE SYSTEM SHALL manter a Caucao e o Repasse retidos em Escrow, sem registrar Lancamento de devolução de caução nem de Repasse.
3. WHEN uma Disputa é aberta, THE SYSTEM SHALL notificar o Backoffice.
4. WHEN uma parte anexa fotos ou texto como evidência a uma Disputa, THE SYSTEM SHALL associar as evidências à Disputa.
5. WHEN o Administrador decide uma Disputa, THE SYSTEM SHALL registrar decisão, motivo, autor e valores destinados ao Cliente e ao Ofertante, gerar os Lancamentos correspondentes e alterar o Aluguel para CONCLUIDO.
6. IF a soma dos valores da decisão excede o valor retido em Escrow para o Aluguel, THEN THE SYSTEM SHALL rejeitar a decisão.

### Requirement 20: Chat entre cliente e ofertante

**User Story:** Como Cliente e Ofertante, quero conversar dentro do app depois do aceite, para que possamos combinar detalhes sem expor contatos pessoais.

#### Acceptance Criteria

1. WHEN uma Oferta é aceita, THE SYSTEM SHALL liberar o chat entre o Cliente e o Ofertante do Aluguel.
2. IF o chat de um Aluguel é acessado antes do aceite da Oferta ou por Usuario que não é Cliente nem Ofertante desse Aluguel, THEN THE SYSTEM SHALL negar o acesso.
3. WHEN um participante envia texto ou imagem no chat, THE SYSTEM SHALL entregar a mensagem ao outro participante em tempo real.
4. THE SYSTEM SHALL manter telefone e e-mail dos Usuarios ocultos durante todo o fluxo.

### Requirement 21: Avaliações mútuas

**User Story:** Como Cliente e Ofertante, quero avaliar a outra parte ao fim do aluguel, para que a reputação ajude as próximas escolhas.

#### Acceptance Criteria

1. WHEN um Aluguel é CONCLUIDO, THE SYSTEM SHALL permitir que Cliente e Ofertante registrem, cada um, uma nota de 1 a 5 e um comentário sobre a outra parte.
2. IF a avaliação é enviada para Aluguel que não está CONCLUIDO ou por autor que já avaliou esse Aluguel, THEN THE SYSTEM SHALL rejeitar a avaliação.
3. THE SYSTEM SHALL calcular a nota média de cada Usuario como a média aritmética das notas recebidas.
4. THE SYSTEM SHALL exibir no perfil público nome, foto, nota média e número de aluguéis concluídos.

### Requirement 22: Backoffice básico

**User Story:** Como Administrador, quero um painel para moderar e acompanhar a operação, para que eu mantenha a qualidade e a segurança do serviço.

#### Acceptance Criteria

1. THE Backoffice SHALL permitir consultar Usuarios, revisar a Verificacao_Identidade e suspender ou banir contas.
2. THE Backoffice SHALL apresentar a fila de Disputas com evidências e permitir registrar a decisão.
3. THE Backoffice SHALL listar Repasses com estado, falhas e conciliação com o Gateway_Pagamento.
4. THE Backoffice SHALL exibir alertas de Pedidos sem Oferta, falta de Entregador e falhas de pagamento.
5. THE Backoffice SHALL apresentar denúncias e permitir moderar conteúdo e itens proibidos.
6. WHEN um Administrador executa uma ação no Backoffice, THE SYSTEM SHALL registrar um log de auditoria com autor, ação, alvo e data e hora.
7. THE Backoffice SHALL exigir autenticação própria com perfis de acesso por Administrador.
8. IF a conta de um Usuario está SUSPENSO ou BANIDO, THEN THE SYSTEM SHALL rejeitar a publicação de Pedidos e o envio de Ofertas por esse Usuario.

### Requirement 23: Parâmetros configuráveis

**User Story:** Como gestor do produto, quero que valores de negócio sejam parâmetros, para que eu possa ajustá-los sem alterar o código.

#### Acceptance Criteria

1. THE SYSTEM SHALL armazenar como Parametro_Config versionado, com vigência e escopo, ao menos: comissao_percentual, Escala_Caucao, multas, raio_padrao_km, T_SEM_OFERTA, validade do Pedido, tabela de frete, prazo de pagamento, política de reembolso, limite de Pedidos ABERTOS por Usuario e limites de notificação.
2. THE SYSTEM SHALL obter todos esses valores de Parametro_Config, sem valores fixos no código.
3. WHEN um Parametro_Config é alterado, THE SYSTEM SHALL aplicar o novo valor somente a Aluguéis criados após a vigência, mantendo inalterados os valores gravados nos Aluguéis existentes.
4. IF um Parametro_Config obrigatório não tem valor vigente, THEN THE SYSTEM SHALL rejeitar a operação dependente e alertar o Backoffice.
5. THE SYSTEM SHALL acessar pagamento, verificação de identidade e entrega por meio das interfaces PaymentProvider, IdentityProvider e DeliveryProvider.

### Requirement 24: Eventos e métricas de analytics

**User Story:** Como gestor do produto, quero métricas de funil por bairro, para que eu avalie a densidade de ofertas e decida a expansão.

#### Acceptance Criteria

1. WHEN ocorrem os acontecimentos de negócio PedidoCriado, PedidoCompartilhado, PedidoAbertoPorLink, OfertaEnviada, PrimeiraOfertaRecebida, OfertaAceita, PagamentoRetido, ContratoAceito, EntregaSolicitada, AluguelConcluido, DisputaAberta, PedidoSemOferta e IdentidadeVerificada, THE SYSTEM SHALL emitir o Evento_Analytics correspondente com identificadores internos, região e carimbo de tempo.
2. THE SYSTEM SHALL emitir no máximo um Evento_Analytics PrimeiraOfertaRecebida por Pedido, com carimbo de tempo posterior ao de PedidoCriado.
3. THE SYSTEM SHALL calcular a porcentagem de Pedidos que recebem ao menos uma Oferta, o tempo até a primeira Oferta e a porcentagem de Pedidos que viram Aluguel com pagamento retido.
4. THE SYSTEM SHALL disponibilizar as métricas agregadas por bairro.
5. THE SYSTEM SHALL excluir dos Eventos_Analytics dados pessoais além de identificadores internos.

### Requirement 25: Privacidade e segurança

**User Story:** Como Usuario, quero que meus dados e meu dinheiro sejam protegidos, para que eu use o JALUGA com tranquilidade.

#### Acceptance Criteria

1. THE SYSTEM SHALL exibir a terceiros somente a Area_Aproximada até o pagamento do Aluguel ser retido.
2. THE SYSTEM SHALL autorizar cada requisição por papel e por recurso, negando acesso a recursos de outros Usuarios.
3. WHEN um Usuario solicita exportação ou exclusão de seus dados, THE SYSTEM SHALL atender a solicitação conforme a LGPD, preservando os registros sujeitos a retenção financeira e legal.
4. WHEN o Usuario se cadastra, THE SYSTEM SHALL registrar o consentimento e apresentar a política de privacidade.
5. THE SYSTEM SHALL servir fotos, Contratos e anexos de Disputa por URLs assinadas com prazo de validade.
6. WHEN um número de requisições de um mesmo cliente excede o limite definido em Parametro_Config, THE SYSTEM SHALL rejeitar as requisições excedentes.
7. IF um webhook do Gateway_Pagamento ou do Provedor_Identidade chega sem assinatura válida, THEN THE SYSTEM SHALL descartá-lo e registrar a ocorrência.
8. THE SYSTEM SHALL armazenar chaves e segredos em cofre de segredos, fora do código e dos logs.

### Requirement 26: Identidade visual e idioma

**User Story:** Como Usuario, quero um app com a cara do JALUGA, em português e com tom de vizinho, para que a experiência seja próxima e confiável.

#### Acceptance Criteria

1. THE SYSTEM SHALL centralizar no tema do App_Mobile os Tokens_Tema, incluindo roxo principal #6C2BD9, roxo escuro #2A0E5C, lilás #EDE4FF e amarelo de destaque #FFC93C.
2. THE App_Mobile SHALL obter as cores de todas as telas dos Tokens_Tema, sem repetir valores de cor nas telas.
3. THE App_Mobile SHALL usar o mascote jabuti e o motivo hexagonal em ícones, avatares de status e ilustrações de estados vazios.
4. THE App_Mobile SHALL apresentar textos em português do Brasil, com tom amigável e próximo, e valores monetários em BRL.
5. THE App_Mobile SHALL ser distribuído para Android e iOS a partir de um código único.

### Requirement 27: Escopo inicial e itens fora do MVP

**User Story:** Como gestor do produto, quero delimitar o escopo do MVP, para que a equipe entregue primeiro o que valida o negócio.

#### Acceptance Criteria

1. THE SYSTEM SHALL operar inicialmente nos bairros de Mogi das Cruzes (SP) habilitados em Parametro_Config.
2. THE SYSTEM SHALL excluir do MVP os itens da Fase_2: destaque pago de ofertas, proteção opcional do item, rastreio de entrega em tempo real, aplicativo próprio do Entregador, expansão para outras cidades, versão web completa para Clientes e Ofertantes e taxa de entrega como receita complementar.
3. WHEN o Cliente ou o Ofertante acompanha uma entrega, THE SYSTEM SHALL apresentar o status registrado pelo Backoffice e por notificações, sem rastreio em tempo real.
