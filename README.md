# 📝 ADA Markdown Editor

Editor de Documentos Markdown desenvolvido como parte do processo seletivo para a bolsa de desenvolvimento Frontend do Projeto ADA - Assembly Digital Assistant.

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn** ou **pnpm**

Para verificar se você tem o Node.js instalado:

```bash
node --version
npm --version
```

## 🔧 Instalação

1. **Clone o repositório** (ou baixe o código)

```bash
git clone <url-do-repositorio>
cd Editor-de-Documentos-Markdown
```

2. **Instale as dependências**

```bash
npm install
```

ou

```bash
yarn install
```

ou

```bash
pnpm install
```

## ▶️ Como Rodar

### Modo Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

ou

```bash
yarn dev
```

ou

```bash
pnpm dev
```

O projeto estará disponível em: [http://localhost:3000](http://localhost:3000)

### Build para Produção

Para criar uma build de produção:

```bash
npm run build
```

Para iniciar o servidor de produção:

```bash
npm start
```

### Linting

Para verificar problemas no código:

```bash
npm run lint
```

## 🚀 Funcionalidades

### Funcionalidades Obrigatórias ✅

- **CRUD de Documentos**
  - ✅ Criar documento novo
  - ✅ Renomear documento
  - ✅ Editar conteúdo
  - ✅ Excluir documento
  - ✅ Listar documentos existentes
  - ✅ Armazenamento no localStorage

- **Editor com Preview Markdown**
  - ✅ Textarea para escrever conteúdo em Markdown
  - ✅ Preview renderizado em tempo real com `react-markdown`
  - ✅ Atualização automática conforme o usuário edita

- **Toolbar de Estilização**
  - ✅ Negrito (`**texto**`)
  - ✅ Itálico (`*texto*`)
  - ✅ Título (`## título`)
  - ✅ Lista simples (`- item`)
  - ✅ Link (`[texto](url)`)
  - ✅ Imagem (`![alt](url)`)

- **Context API**
  - ✅ Gerenciamento de lista de documentos
  - ✅ Documento selecionado
  - ✅ Funções de criar, atualizar e excluir documentos

- **Roteamento**
  - ✅ `/` → Lista de documentos
  - ✅ `/doc/:id` → Edição do documento selecionado

### Funcionalidades Extras ⭐

- ✅ **Autosave com debounce** - Salva automaticamente após 800ms de inatividade
- ✅ **Tema claro/escuro** - Implementado com Material UI (MUI)
- ✅ **Componentização avançada** - Componentes bem organizados e reutilizáveis
- ✅ **Renomear documento diretamente na listagem** - Edição inline do título
- ✅ **Organização de pastas bem planejada** - Estrutura clara e escalável
- ✅ **Tipagem avançada com TypeScript** - Tipos bem definidos
- ✅ **Layout dividido** - Editor e Preview lado a lado usando MUI

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 16.0.7 (App Router)
- **Linguagem**: TypeScript
- **UI Library**: Material UI (MUI) v7.3.6
- **Estilização**: Tailwind CSS v4
- **Markdown**: react-markdown + remark-breaks
- **Ícones**: lucide-react
- **Gerenciamento de Estado**: React Context API
- **Hooks Customizados**: useLocalStorage, useDebounce

## 📁 Estrutura do Projeto

```
Editor-de-Documentos-Markdown/
├── src/
│   ├── app/                    # Páginas e rotas (Next.js App Router)
│   │   ├── page.tsx           # Página inicial (lista de documentos)
│   │   ├── doc/[id]/          # Página de edição de documento
│   │   ├── layout.tsx         # Layout principal
│   │   └── globals.css        # Estilos globais
│   ├── components/            # Componentes React
│   │   ├── DocumentEditor.tsx # Editor com preview dividido
│   │   ├── header.tsx         # Cabeçalho com toggle de tema
│   │   ├── TitleEditor.tsx    # Editor de título inline
│   │   └── Toolbar.tsx        # Barra de ferramentas Markdown
│   ├── context/               # Context API
│   │   ├── DocumentsContext.tsx # Gerenciamento de documentos
│   │   └── ThemeContext.tsx   # Gerenciamento de tema (MUI)
│   ├── hooks/                 # Hooks customizados
│   │   ├── useLocalStorage.ts # Hook para localStorage
│   │   └── useDebouce.ts     # Hook para debounce
│   └── types/                 # Definições de tipos TypeScript
│       └── IDocument.ts      # Interface do documento
├── public/                    # Arquivos estáticos
├── package.json              # Dependências e scripts
└── README.md                 # Este arquivo
```

## 💾 Armazenamento

Os documentos são salvos automaticamente no **localStorage** do navegador no formato:

```typescript
{
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}
```

## 🎨 Tema

O projeto utiliza **Material UI (MUI)** para gerenciamento de tema, oferecendo suporte nativo para modo claro e escuro. A preferência do usuário é salva no localStorage.

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria uma build de produção
- `npm start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter ESLint

## 🎯 Funcionalidades Implementadas

### CRUD Completo
- ✅ Criar novos documentos
- ✅ Editar título e conteúdo
- ✅ Excluir documentos com confirmação
- ✅ Listar todos os documentos

### Editor Avançado
- ✅ Preview em tempo real
- ✅ Toolbar com formatação Markdown
- ✅ Autosave automático
- ✅ Layout dividido (50/50)
- ✅ Suporte a quebras de linha simples

### UX/UI
- ✅ Tema claro/escuro
- ✅ Design responsivo
- ✅ Animações suaves
- ✅ Feedback visual

## 📄 Licença

Este projeto foi desenvolvido como parte do processo seletivo do Projeto ADA.

## 👨‍💻 Autor

Desenvolvido para o desafio do processo seletivo ADA - Assembly Digital Assistant.

---

**Desenvolvido usando Next.js, TypeScript e Material UI**
