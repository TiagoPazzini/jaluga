# JALUGA

App mobile de aluguel de itens entre vizinhos em Mogi das Cruzes (SP). **Você pede. O bairro oferta.**

Quem precisa de um item publica o pedido e a data. Os vizinhos que têm o item enviam ofertas.

Este repositório contém a **Fase 1**: um protótipo navegável, sem backend, com dados simulados.

## Requisitos

- [Node.js](https://nodejs.org) versão LTS (20 ou mais nova)
- [Git](https://git-scm.com)
- App **Expo Go** no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) ou [iOS](https://apps.apple.com/app/expo-go/id982107779)), compatível com o **SDK 58**

## Como rodar

```bash
git clone https://github.com/TiagoPazzini/jaluga.git
cd jaluga/jaluga-app
npm install
npx expo start
```

Escaneie o QR code que aparece no terminal:

- **Android:** abra o Expo Go e toque em "Scan QR code".
- **iPhone:** aponte a câmera do celular.

O celular e o computador precisam estar no **mesmo Wi-Fi**.

## Problemas comuns

**Tela branca com ícone de recarregar no celular**
O celular não consegue acessar o computador. Tente:

1. Conferir se os dois estão no mesmo Wi-Fi (dados móveis desligados).
2. Permitir o Node.js no Firewall do Windows (Painel de Controle → Firewall do Windows Defender → Permitir um aplicativo → marcar "Node.js" em redes privadas).
3. Usar um túnel, que funciona em qualquer rede:
   ```bash
   npx expo start --tunnel ngrok
   ```

**Windows: "a execução de scripts foi desabilitada neste sistema"**
Use `npm.cmd` e `npx.cmd` no lugar de `npm` e `npx`, ou rode uma vez no PowerShell:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

**Erro de dependência no `npm install`**
O arquivo `jaluga-app/.npmrc` já ativa `legacy-peer-deps`. Rode o comando de dentro da pasta `jaluga-app`.

## Estrutura

```
.kiro/
  specs/jaluga-fase1-prototipo/   requisitos, design e tarefas da Fase 1
  steering/                       regras de produto, stack e estrutura
jaluga-app/
  app/                            telas (rotas do Expo Router)
  src/components/                 componentes reutilizáveis
  src/mocks/                      dados simulados
  src/store/                      estado em memória (Zustand)
  src/theme/                      cores, fontes e sombra
  docs/                           documentos do produto
```

## Stack

React Native + Expo (TypeScript), Expo Router, NativeWind, Zustand, Lucide e fontes Nunito e Inter.

## Status da Fase 1

| Pronto | Em andamento |
|---|---|
| Início, Criar pedido, Pedido publicado, Detalhe do meu pedido | Onboarding e login |
| Ofertar, Detalhe do pedido, Enviar oferta, Oferta enviada | Checkout e Detalhe do aluguel |
| | Aluguéis, Perfil e Notificações |

O plano completo está em [`.kiro/specs/jaluga-fase1-prototipo/tasks.md`](.kiro/specs/jaluga-fase1-prototipo/tasks.md).

## Verificar o código

```bash
cd jaluga-app
npx tsc --noEmit
```
