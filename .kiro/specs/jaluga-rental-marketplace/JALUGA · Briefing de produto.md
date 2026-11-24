# JALUGA: briefing de produto

> **Para o Kiro:** este documento descreve a ideia de negócio do JALUGA. Use-o como base para gerar requirements, design e tasks do MVP.
> Legenda: **[Definido]** = decisão do fundador. **[Sugestão]** = proposta ainda a validar, que pode ser ajustada.

---

## 1. Visão geral

**JALUGA** ("já aluga") é um **aplicativo mobile de aluguel de itens entre pessoas (P2P)**.

- **Problema [Definido]:** a pessoa precisa de um produto, o valor de compra não cabe no bolso naquele momento e ela não vai usar o item de novo.
- **Solução [Definido]:** o cliente **publica a demanda (o item que precisa e a data)** e **pessoas da região que têm o item enviam ofertas** de aluguel.
- **Principal diferencial [Definido]:** a **demanda invertida**. Em vez de procurar anúncios, quem precisa faz um pedido e as ofertas chegam até ele. Quem tem o item não precisa criar um anúncio, basta responder a um pedido real.
- **Slogan [Sugestão]:** "Você pede. O bairro oferta."

## 2. Escopo e público

| Item | Decisão |
|---|---|
| Plataforma | **[Definido]** App mobile |
| Região inicial | **[Definido]** Mogi das Cruzes (SP). Expansão depois para o Alto Tietê |
| Modelo | **[Definido]** Pessoa para pessoa (P2P) |
| Itens aceitos | **[Definido]** Qualquer item transportável |
| Itens não aceitos | **[Sugestão]** Imóveis, veículos, itens ilegais ou perigosos, itens que exigem licença |

**Perfis de usuário** (a mesma conta pode ter os dois papéis):
- **Cliente (locatário):** publica pedidos e aluga itens.
- **Ofertante (locador):** responde aos pedidos com ofertas e aluga seus itens.
- **Entregador parceiro:** faz a coleta e a entrega quando o cliente escolhe receber em casa.
- **Administrador (backoffice):** modera, resolve disputas e gerencia verificação e repasses.

## 3. Fluxo principal

1. **Pede:** o cliente cria um pedido com a descrição do item, a categoria, a data ou período de uso, a localização ou raio e fotos de referência (opcional).
2. **Recebe ofertas:** ofertantes próximos são notificados e enviam ofertas com preço, condições, fotos do item, caução e opções de entrega ou retirada.
3. **Escolhe e paga:** o cliente compara as ofertas (preço, distância, avaliação) e aceita uma. O pagamento fica **retido no app**.
4. **Contrato:** o app gera um contrato digital do aluguel, com a **multa prevista**, e aplica a **caução**.
5. **Entrega ou retirada:** um entregador parceiro intermediado pelo app leva o item, **ou** o cliente busca diretamente com o ofertante.
6. **Uso e devolução:** a devolução segue o mesmo caminho da entrega (entregador ou retirada).
7. **Liberação:** depois da devolução confirmada, o valor é **liberado ao ofertante**, já descontada a comissão, e a caução é devolvida ao cliente.
8. **Avaliação [Sugestão]:** os dois lados se avaliam.

## 4. Confiança e segurança [Definido]

- **Verificação de identidade** obrigatória antes de alugar ou ofertar.
- **Pagamento retido** (escrow) até a devolução do item.
- **Contrato digital com multa** prevista para atraso, dano ou perda.
- **Caução escalonada**, proporcional ao valor do item.
- **[Sugestão]** Avaliações mútuas, fotos do estado do item na entrega e na devolução (check-in e check-out) e um fluxo de disputa mediado pelo backoffice.

## 5. Logística [Definido]

- O app faz o **intermédio com entregadores** quando necessário.
- O cliente pode optar por **buscar o item** pessoalmente.
- **[Sugestão]** Rastreio da entrega no app e cálculo do frete por distância.

## 6. Modelo de receita

- **[Definido] Principal:** comissão sobre cada aluguel fechado no app.
- **[Sugestão] Complementares:** taxa sobre as entregas intermediadas, destaque pago para ofertas e proteção opcional do item contra danos.
- **[Sugestão] Lançamento:** sem comissão para o ofertante nos primeiros meses.

## 7. Go-to-market [Sugestão aprovada pelo fundador]

1. **Começar por poucos bairros de Mogi** e criar densidade de ofertas antes de expandir.
2. **Atrair primeiro quem tem itens** em condomínios, grupos de bairro (WhatsApp e Facebook) e universidades.
3. **O pedido divulga o app:** cada pedido gera um link compartilhável, e quem abre pode se cadastrar e ofertar.
4. **Campanhas sazonais:** fim de ano, férias, volta às aulas, mudanças e festas juninas.
5. **Parceiros locais** (entregadores) e expansão para o Alto Tietê, bairro a bairro.

**Métricas-chave:** porcentagem de pedidos que recebem pelo menos uma oferta, tempo até a primeira oferta e porcentagem de pedidos que viram aluguel.

## 8. Identidade visual [Definido]

- **Cor principal:** roxo `#6C2BD9`. Roxo escuro `#2A0E5C`. Lilás `#EDE4FF`. Destaque amarelo `#FFC93C` (usado no "JA" do nome).
- **Mascote:** **jabuti** (tartaruga) roxo, com casco hexagonal, carregando uma caixa. Transmite segurança e cuidado.
- **Motivo visual:** hexágono (casco).
- **Tom:** amigável, próximo, de vizinho.
- **Arquivos:** `jaluga-mascote-jabuti_2.png` (mascote) e `JALUGA-pitch.pptx` (pitch).

## 9. Escopo sugerido do MVP

**Dentro do MVP:**
- Cadastro e login, com verificação de identidade
- Criar, editar e cancelar pedido (item, data, local)
- Notificação de pedidos próximos para ofertantes
- Envio, comparação e aceite de ofertas
- Chat entre cliente e ofertante após o aceite
- Pagamento retido, caução, comissão e repasse
- Contrato digital gerado automaticamente
- Escolha entre entrega por parceiro e retirada
- Confirmação de entrega e devolução, com fotos
- Avaliações
- Link compartilhável do pedido
- Backoffice básico (usuários, disputas, repasses)

**Fora do MVP (fase 2):** destaque pago, proteção do item, rastreio em tempo real, app próprio para o entregador, expansão para outras cidades.

## 10. Requisitos (formato EARS, para o modo spec do Kiro)

**Pedidos**
- WHEN o cliente publica um pedido com item, data e localização THE SYSTEM SHALL notificar os ofertantes verificados dentro do raio definido.
- WHEN um pedido não recebe ofertas em X horas THE SYSTEM SHALL alertar o backoffice e sugerir ao cliente que amplie o raio.
- THE SYSTEM SHALL gerar um link público para cada pedido, que direciona ao cadastro ou à oferta.

**Ofertas**
- WHEN um ofertante envia uma oferta THE SYSTEM SHALL exigir preço, fotos do item, valor da caução e opções de entrega ou retirada.
- WHEN o cliente aceita uma oferta THE SYSTEM SHALL recusar automaticamente as demais ofertas e notificar os ofertantes.

**Segurança e pagamento**
- IF o usuário não concluiu a verificação de identidade THEN THE SYSTEM SHALL impedir que ele publique pedidos ou envie ofertas.
- WHEN uma oferta é aceita THE SYSTEM SHALL cobrar o aluguel e a caução e manter os valores retidos.
- WHEN o aluguel é confirmado THE SYSTEM SHALL gerar um contrato digital com as condições, a multa e a caução, e exigir o aceite das duas partes.
- WHEN a devolução é confirmada pelas duas partes THE SYSTEM SHALL liberar o valor ao ofertante, descontada a comissão, e devolver a caução ao cliente.
- IF houver atraso, dano ou perda reportados THEN THE SYSTEM SHALL abrir uma disputa e reter a caução até a decisão do backoffice.

**Logística**
- WHEN o cliente escolhe a entrega THE SYSTEM SHALL calcular o frete e acionar um entregador parceiro para a coleta e a entrega.
- WHEN o cliente escolhe a retirada THE SYSTEM SHALL liberar o endereço ou ponto de encontro somente após o pagamento.
- WHEN o item é entregue ou devolvido THE SYSTEM SHALL solicitar fotos do estado do item.

## 11. Decisões em aberto (para definir com o fundador)

- Stack do app (ex.: React Native ou Flutter) e backend (sugestão: AWS)
- Provedor de pagamento com conta retida e split (ex.: gateways que suportam marketplace no Brasil, com Pix e cartão)
- Provedor de verificação de identidade (documento + selfie)
- Percentual da comissão e regra da escala de caução
- Modelo de contrato e valores de multa (validação jurídica)
- Integração com entregadores: parceiros locais ou plataforma de terceiros
- Raio padrão de busca e tempo limite para ofertas
