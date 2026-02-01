# 🩰 Ballet - Sistema de Gestão para Escolas de Ballet

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)
![Express](https://img.shields.io/badge/Express-5.2.1-000000?style=for-the-badge&logo=express)
![Prisma](https://img.shields.io/badge/Prisma-7.3.0-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-316192?style=for-the-badge&logo=postgresql)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

**Sistema completo para gerenciamento de escolas de ballet, utilizadores e taxas de royalties.**

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Arquitetura](#-arquitetura)
- [Tecnologias](#-tecnologias)
- [Funcionalidades](#-funcionalidades)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Comandos](#-comandos)
- [API Endpoints](#-api-endpoints)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Modelos de Dados](#-modelos-de-dados)
- [Autenticação](#-autenticação)
- [Frontend Pages](#-frontend-pages)

---

## 🎯 Sobre o Projeto

O **Ballet** é um sistema de gestão desenvolvido para escolas de ballet, permitindo o cadastro de escolas, gestão de utilizadores e controle de taxas de royalties. O sistema conta com:

- **Autenticação segura** com senhas temporárias
- **Gestão de escolas** com informações completas (endereço, responsável, taxas)
- **Cadastro de utilizadores** vinculados a escolas
- **Dashboard** para visualização de utilizadores da escola
- **Interface moderna** com design responsivo e elegante

---

## 🏗️ Arquitetura

O projeto segue uma arquitetura **monorepo** com separação clara entre frontend e backend:

```
ex1/
├── back/ballet/          # Backend - API REST
│   ├── src/
│   │   ├── controller/   # Controllers da aplicação
│   │   ├── domain/       # Entidades e DTOs
│   │   ├── repository/   # Camada de acesso a dados
│   │   ├── routes/       # Definição de rotas
│   │   ├── services/     # Casos de uso (Use Cases)
│   │   └── generated/    # Cliente Prisma gerado
│   └── prisma/           # Schema do banco de dados
│
└── front/ballet/         # Frontend - Next.js App
    └── src/
        ├── app/          # Páginas (App Router)
        ├── components/   # Componentes reutilizáveis
        ├── contexts/     # Context API (Auth)
        ├── services/     # Serviços de API
        └── types/        # Tipos TypeScript
```

---

## 🛠️ Tecnologias

### Backend
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Node.js** | 20+ | Runtime JavaScript |
| **Express** | 5.2.1 | Framework web minimalista |
| **TypeScript** | 5.9.3 | Superset tipado de JavaScript |
| **Prisma** | 7.3.0 | ORM moderno para Node.js |
| **PostgreSQL** | 15+ | Banco de dados relacional |
| **dotenv** | 17.2.3 | Gerenciamento de variáveis de ambiente |
| **cors** | 2.8.6 | Middleware de CORS |

### Frontend
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Next.js** | 16.1.6 | Framework React fullstack |
| **React** | 19.2.3 | Biblioteca de UI |
| **TypeScript** | 5.x | Tipagem estática |
| **TailwindCSS** | 4.x | Framework CSS utility-first |
| **Radix UI** | Latest | Componentes headless acessíveis |
| **Lucide React** | 0.563.0 | Ícones modernos |

---

## ✨ Funcionalidades

### 🔐 Autenticação
- [x] Login com email e senha
- [x] Senhas temporárias para novos utilizadores
- [x] Modal automático para alteração de senha temporária
- [x] Persistência de sessão via localStorage
- [x] Middleware de autenticação via header customizado

### 🏫 Gestão de Escolas
- [x] Cadastro completo de escola (nome, responsável, endereço)
- [x] Definição de taxa de royalties
- [x] Configuração de dia de pagamento
- [x] Vinculação automática de utilizador à escola

### 👥 Gestão de Utilizadores
- [x] Cadastro de novos utilizadores
- [x] Geração automática de senha temporária
- [x] Vinculação de utilizador à escola
- [x] Listagem de utilizadores por escola
- [x] Exibição de senha temporária após cadastro

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** >= 20.x
- **npm** >= 10.x ou **yarn** >= 1.22.x
- **PostgreSQL** >= 15.x
- **Git**

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/ThiagoDeMattiaScoti/ballet.git
cd ballet
```

### 2. Instale as dependências do Backend

```bash
cd back/ballet
npm install
```

### 3. Instale as dependências do Frontend

```bash
cd ../../front/ballet
npm install
```

---

## ⚙️ Configuração

### Backend - Variáveis de Ambiente

Crie um arquivo `.env` em `back/ballet/`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/ballet_db"
CORS_ORIGIN="http://localhost:3000"
```

### Configuração do Banco de Dados

```bash
cd back/ballet

# Gerar cliente Prisma
npm run prisma:generate

# Executar migrations
npm run prisma:migrate

# (Opcional) Abrir Prisma Studio
npm run prisma:studio
```

---

## 💻 Comandos

### Backend (`back/ballet/`)

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento (porta 3333) |
| `npm run prisma:generate` | Gera o cliente Prisma |
| `npm run prisma:migrate` | Executa as migrations do banco |
| `npm run prisma:studio` | Abre o Prisma Studio (GUI do banco) |

### Frontend (`front/ballet/`)

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento (porta 3000) |
| `npm run build` | Gera build de produção |
| `npm run start` | Inicia servidor de produção |

### Execução Completa

Para rodar o projeto completo, abra dois terminais:

**Terminal 1 - Backend:**
```bash
cd back/ballet
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd front/ballet
npm run dev
```

Acesse: **http://localhost:3000**

---

## 🌐 API Endpoints

### Autenticação & Utilizadores

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `POST` | `/login` | Autenticação de utilizador | ❌ |
| `POST` | `/criarSenha` | Atualiza senha temporária | ✅ |
| `POST` | `/criarUsuario` | Cadastra novo utilizador | ❌ |

### Escolas

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `POST` | `/cadastrar` | Cadastra nova escola | ✅ |
| `GET` | `/listaUtilizadores` | Lista utilizadores da escola | ✅ |

### Exemplo de Requisições

**Login:**
```bash
curl -X POST http://localhost:3333/login \
  -H "Content-Type: application/json" \
  -d '{"email": "usuario@escola.com", "senha": "senha123"}'
```

**Criar Utilizador:**
```bash
curl -X POST http://localhost:3333/criarUsuario \
  -H "Content-Type: application/json" \
  -d '{
    "usuario": {
      "nome": "João Silva",
      "email": "joao@escola.com",
      "idEscola": 1
    }
  }'
```

---

## 📁 Estrutura do Projeto

### Backend

```
back/ballet/src/
├── controller/
│   ├── escolaController.ts      # Controller de escolas
│   ├── loginController.ts       # Controller de login
│   ├── usuarioController.ts     # Controller de utilizadores
│   └── middleware/
│       └── authMiddleware.ts    # Middleware de autenticação
├── domain/
│   ├── DTO/
│   │   ├── escolaDTO.ts         # DTO de escola
│   │   ├── loginDTO.ts          # DTO de login
│   │   └── usuarioDTO.ts        # DTO de utilizador
│   └── entity/
│       ├── Escola.entity.ts     # Entidade Escola
│       └── Usuario.entity.ts    # Entidade Utilizador
├── repository/
│   ├── IRepository/             # Interfaces dos repositórios
│   ├── escolaRepository.ts      # Repositório de escolas
│   └── usuarioRepository.ts     # Repositório de utilizadores
├── routes/
│   ├── escola.routes.ts         # Rotas de escola
│   └── usuario.routes.ts        # Rotas de utilizador
├── services/
│   ├── escola/
│   │   └── cadastrarUseCase.ts  # Use Case de cadastro de escola
│   └── usuario/
│       ├── criarUseCase.ts      # Use Case de criação de utilizador
│       ├── criarSenhaUseCase.ts # Use Case de atualização de senha
│       └── loginUseCase.ts      # Use Case de login
└── server.ts                     # Entry point do servidor
```

### Frontend

```
front/ballet/src/
├── app/
│   ├── cadastrar-escola/
│   │   └── page.tsx             # Página de cadastro de escola
│   ├── cadastrar-usuario/
│   │   └── page.tsx             # Página de cadastro de utilizador
│   ├── login/
│   │   └── page.tsx             # Página de login
│   ├── usuarios/
│   │   └── page.tsx             # Dashboard de utilizadores
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Página inicial (redirect)
│   └── globals.css              # Estilos globais
├── components/
│   ├── Header.tsx               # Componente de cabeçalho
│   ├── PasswordModal.tsx        # Modal de alteração de senha
│   └── ui/                      # Componentes de UI (shadcn/ui)
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       └── label.tsx
├── contexts/
│   └── AuthContext.tsx          # Context de autenticação
├── services/
│   └── api.ts                   # Configuração de API
└── types/
    └── index.ts                 # Tipos TypeScript
```

---

## 📊 Modelos de Dados

### Escola

```prisma
model escola {
  id            Int        @id @default(autoincrement())
  nomeEscola    String
  responsavel   String
  email         String
  telefone      String
  taxaRoylties  Decimal    @db.Decimal(12, 5)
  diaPagamento  Int
  cidade        String
  uf            String
  bairro        String
  cep           String
  usuarios      usuarios[]
}
```

### Utilizador

```prisma
model usuarios {
  id              Int      @id @default(autoincrement())
  email           String   @unique
  senha           String
  nome            String
  senhaTemporaria Boolean  @default(true)
  idEscola        Int?
  escola          escola?  @relation(fields: [idEscola], references: [id])
  createdAt       DateTime @default(now())
}
```

---

## 🔒 Autenticação

O sistema utiliza autenticação via header customizado `x-user-data`:

1. **Login**: Utilizador envia email e senha
2. **Resposta**: Backend retorna dados do utilizador no header `x-user-data` (base64)
3. **Armazenamento**: Frontend salva no localStorage (`ballet_user` e `ballet_user_data`)
4. **Requisições autenticadas**: Frontend envia o header `x-user-data` em cada requisição
5. **Middleware**: Backend valida o header e extrai os dados do utilizador

### Fluxo de Senha Temporária

1. Novo utilizador é criado com `senhaTemporaria: true`
2. Senha aleatória é gerada e retornada
3. No primeiro login, modal de alteração é exibido
4. Utilizador define nova senha
5. Flag `senhaTemporaria` é atualizado para `false`

---

## 📄 Frontend Pages

| Rota | Descrição | Autenticação |
|------|-----------|--------------|
| `/login` | Página de login | ❌ |
| `/usuarios` | Dashboard com lista de utilizadores | ✅ |
| `/cadastrar-escola` | Formulário de cadastro de escola | ✅ |
| `/cadastrar-usuario` | Formulário de cadastro de utilizador | ✅ |

---

## 🎨 Design

O frontend utiliza um design moderno com:

- **Gradientes** em tons de rosa e roxo
- **Glassmorphism** em cards e modais
- **Ícones** com emojis e Lucide React
- **Animações** suaves de transição
- **Responsividade** para todos os tamanhos de tela

---

## 📝 Licença

Este projeto está sob a licença ISC.

---

## 👤 Autor

**Thiago De Mattia Scoti**

- GitHub: [@ThiagoDeMattiaScoti](https://github.com/ThiagoDeMattiaScoti)

---

<div align="center">

Feito com 💗 para escolas de ballet

</div>
