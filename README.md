# Aplicação Web de Cadastro de Jogos — React

Projeto desenvolvido para a disciplina de Tecnologias Web, consistindo em uma aplicação web em React para cadastro e gerenciamento de uma coleção pessoal de jogos, integrada a uma API REST via JSON Server.

## 👥 Integrantes

| Nome | Responsabilidade |
|------|-----------------|
| Lucca | Página inicial (Inicio.jsx), estilização global (index.css) e configuração base do projeto |
| Davi | Página de listagem (Listagem.jsx) e client da API (client.js) |
| Iury | Página de formulário (Formulario.jsx) |

## 📋 Funcionalidades

- Cadastro de jogos com título, gênero, plataforma, ano, nota, desenvolvedora e descrição
- Validação de formulário com mensagens de erro
- Listagem dinâmica dos jogos cadastrados
- Remoção de jogos da coleção
- Estatísticas da coleção na página inicial
- Integração com API REST via JSON Server
- Navegação entre páginas com React Router

## 📁 Estrutura do Projeto
```
projetogos-react/

├── db.json

├── package.json

└── src/

├── main.jsx

├── App.jsx

├── index.css

├── api/

│   └── client.js

└── pages/

├── Inicio.jsx

├── Listagem.jsx

└── Formulario.jsx
```
## 🚀 Como executar

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```
3. Em dois terminais separados, rode:
```bash
npm run dev
```
```bash
npm run json-server
```
4. Acesse `http://localhost:5173` no navegador

## 🛠️ Tecnologias utilizadas

- React com Vite
- React Router
- JSON Server
- CSS3 com variáveis e Flexbox
- JavaScript puro (Vanilla JS)
