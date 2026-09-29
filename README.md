# Portfólio de Jonas
Portfólio desenvolvido com **HTML5, CSS3, JavaScript, React e Vite**.

---

## Não funciona apenas dando dois cliques no `index.html`

Se você tentar abrir o arquivo `index.html` diretamente com dois cliques no Windows/Mac/Linux (URL começando com `file:///`), **a página não vai funcionar corretamente**.

**Motivo:** Este projeto é uma aplicação que utiliza **Módulos ES (`<script type="module">`)**, **React** e **Vite**. Os navegadores bloqueiam scripts do tipo módulo quando abertos diretamente pelo explorador de arquivos por motivos de segurança.

**Para rodar o projeto no seu computador, é necessário ter o Node.js e iniciar o servidor local com os passos abaixo.**

---

## Pré-requisitos

1. Ter o **Node.js** instalado (versão 18 ou superior, recomendado 20 LTS ou 22 LTS).

---

## 🛠️ Passo a Passo para Rodar Localmente

### 1. Extrair o arquivo ZIP
Extraia todo o conteúdo do arquivo `.zip` em uma pasta de sua preferência.

### 2. Abrir o Terminal na pasta do projeto
- No **Windows**: Entre na pasta extraída, clique na barra de endereço da pasta, digite `cmd` e aperte `Enter` (ou clique com o botão direito e selecione *Abrir no Terminal*).
- No **Mac/Linux**: Abra o terminal e use `cd caminho/para/a/pasta`.

### 3. Instalar as dependências
Execute o comando abaixo para baixar a pasta `node_modules` (que não vem no zip para não ficar pesado):
```bash
npm install
```

> **Dica:** Se aparecer algum conflito de dependências no seu sistema, você pode usar:
> ```bash
> npm install --legacy-peer-deps
> ```

### 4. Iniciar o servidor de desenvolvimento
Execute:
```bash
npm run dev
```
*(ou se preferir, `npm start`)*

### 5. Acessar no Navegador
O terminal irá exibir o link local. Basta abrir no seu navegador:
👉 **[http://localhost:3000](http://localhost:3000)**

*(Caso a porta 3000 já esteja sendo usada por outro programa no seu PC, o Vite abrirá automaticamente na porta `3001` ou similar exibida no terminal).*


## 🔍 Resumo dos Erros Comuns

| **Página em branco ou sem efeito ao abrir pelo Windows** | Abriu o `index.html` com dois cliques (`file:///...`) | Siga o passo a passo acima rodando `npm install` e depois `npm run dev`. |
| **`'vite' não é reconhecido como um comando`** | Não executou `npm install` antes | Execute `npm install` no terminal da pasta para instalar as dependências. |
| **`ReferenceError: __dirname is not defined`** | Incompatibilidade de versão do Node | Já corrigido na configuração do Vite (`vite.config.ts`). |
| **`node: command not found`** | Node.js não está instalado no computador | Instale o Node.js LTS através do site [nodejs.org](https://nodejs.org/). |
