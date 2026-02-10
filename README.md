# 🚀 Loja Tech - Avaliação Prática

Aplicativo mobile desenvolvido em **React Native (Expo)** como projeto de Programação para Dispositivos Móveis.

O app simula uma pequena loja de produtos de tecnologia com funcionamento **online/offline**, carrinho local e sincronização automática com o Supabase.

---

## 🎯 O que o projeto faz

- Listagem de produtos (API FakeStore)
- Adicionar produtos ao carrinho local (SQLite)
- Sincronização automática com banco remoto (Supabase)
- Funcionamento offline
- Histórico remoto de compras
- Controle de itens já presentes no carrinho
- Indicador visual de conexão (Online / Offline)

---

## 📱 Telas do Aplicativo

### 🏠 Catálogo
- Lista produtos da API
- Botão para adicionar ao carrinho
- Sincroniza automaticamente quando há internet

### 🛒 Carrinho
- Mostra produtos salvos localmente
- Indica se já foram sincronizados
- Permite remover itens
- Atualiza o status no Supabase ao remover

### 🕘 Histórico
- Lista produtos vindos do banco remoto
- Só mostra itens que NÃO estão no carrinho
- Permite adicionar novamente ao carrinho
- Permite excluir do histórico

---

## 🧠 Tecnologias utilizadas

- React Native
- Expo
- React Navigation (Bottom Tabs)
- SQLite (armazenamento local)
- Supabase (banco remoto)
- NetInfo (detecção de internet)

---

## 🔄 Funcionamento Offline

O app funciona mesmo sem internet:

- Produto é salvo no SQLite
- Fica marcado como **Offline**
- Quando a conexão volta:
  - O app envia automaticamente para o Supabase
  - Marca como **Sincronizado**

---

## 🗄️ Estrutura do Banco

### SQLite (Local)
Tabela: `carrinho`

Campos:
- id
- nome
- preco
- sincronizado (0 ou 1)

### Supabase (Remoto)
Tabela: `vendas_remotas`

Campos:
- id
- produto_nome
- preco
- no_carrinho (true/false)
- created_at

---

## 📡 Sincronização automática

- Ao abrir o app
- Ao voltar a conexão
- Ao adicionar produto no carrinho

---

## 🟢 Indicador de conexão

No topo do app:

- ONLINE → verde
- OFFLINE → vermelho

Atualiza automaticamente.

---

## 📦 Melhorias implementadas

- SafeArea corrigida (não invade status bar)
- Tabs ajustadas para não ficar embaixo dos botões do Android
- Controle para não duplicar produtos
- Histórico inteligente:
  - Se estiver no carrinho → não aparece botão "+"
  - Se remover do carrinho → volta a aparecer

## ⚙️ Como rodar o projeto

1.  Clone o repositório: `git clone https://github.com/JosePedro1/Loja-Tech.git`
2.  Instale as dependências: `npm install`
3.  Inicie o Expo: `npx expo start`
4.  Escaneie o QR Code com o aplicativo Expo Go.