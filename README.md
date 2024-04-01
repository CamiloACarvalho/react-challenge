# React Challenge 📝

Este teste de Frontend para pessoas desenvolvedoras junior da Trybe. O objetivo é analisar as habilidades das pessoas candidatas, com foco nos fundamentos principais de React e suas bibliotecas relacionadas. Para isso, você irá replicar a ideia de um sistema que captura as notícias mais recentes do IBGE e apresentar elas de forma organizada.

# Milo News

## *Tecnologias Utilizadas*

- React
- TypeScript
- CSS3
- Context API

## *Instalação de Dependências*

#### *Backend*
API utilizada: [IBGE Notícias API](https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=100)

#### *Frontend*
- ✔️ **1. Crie um projeto React com TS usando Vite** – `npm create vite@latest`.
  - 1.1 Project name: 'nome do projeto'
  - 1.2 Select a framework: 'no momento REACT'
  - 1.3 Select a variant: 'TypeScript ou TypeScript + SWC'

**Passo 2:** Instalação de Dependências
- ✔️ **2. Entre na pasta do projeto, instale as dependências e, depois, instale o eslint da Trybe** – `npm install @trybe/eslint-config-frontend`.
  - 2.1 `cd 'nome da pasta'`
  - 2.2 `npm install` (instala as dependências do node)
  - 2.3 Abra o arquivo '.gitignore' e escreva `node_modules/` (nesse arquivo você escreve o nome de todos os arquivos que você não queira fazer o upload para o repositório, o git irá ignorar)
  - 2.4 Abra o arquivo 'package.json' e no objeto "scripts" escreva o value `dev: "vite --open"` (dentro de script você escreve o comando que vc quer digitar e o que ele vai realizar. Neste caso `npm run dev` vai abrir o VITE)
npm install react-router-dom

**Passo 3:** Configuração do ESLint
- ✔️ **3. Crie o arquivo .eslintrc.json e faça o extends para @trybe/eslint-config-frontend/typescript**.
  - 3.1 Como o VITE já vem com o ESLint, precisamos remover, para remover, `rm .eslintrc.cjs`
  - 3.2 Remova as dependências que foram instaladas pelo VITE - `npm remove @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-hooks eslint-plugin-react-refresh`
  - 3.3 Instale o pacote de regras de lint (existe várias regras, inclusive é possível criar as próprias regas, mas por hora, vamos usar as regras da Trybe) - `npm install @trybe/eslint-config-frontend -D`
  - 3.4 Criar o arquivo .eslintrc.json na raiz do projeto - `touch .eslintrc.json`
  - 3.5 Abra o arquivo '.eslintrc.json' e digite:
    ```json
    {
        "extends": "@trybe/eslint-config-frontend/typescript"
    }
    ```
  - 3.6 para rodar o ESLint agora basta digitar o comando - `npm run lint`
  - 3.7 Crie um arquivo de configuração do VSCode `settings.json` na raiz do projeto usando o seguinte comando: - `touch .vscode/settings.json`
  - 3.8 Abra o arquivo `settings.json` e configure-o desta forma:
    ```json
    {
        "editor.formatOnSave": true,
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true,
            "source.fixAll.stylelint": true
        },
        "extensions.ignoreRecommendations": false
    }
    ```
  - 3.9 Execute o comando - `npm run lint` e faça as correções necessárias
    - 3.9.1 Rode o comando - `npm run lint -- --fix` para corrigir boa parte dos erros
    - 3.9.2 No arquivo App.tsx 'count' é o erro, pois é uma variável que é declarada como estado, só alterar para prevCount

**Passo 4:** Configuração do ESLint
- ✔️ **4. Rode o comando para instalar o React-Router-DOM `npm install react-router-dom`

#### *Test*
Não foram criados testes para este projeto.

## Acesse ao Projeto

Para visualizar o projeto, acesse [Milo News](https://react-challenge-zeta.vercel.app/)
