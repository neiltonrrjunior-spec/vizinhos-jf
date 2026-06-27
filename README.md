# Vizinhos JF — Sistema de Gestão para Associação de Moradores

Plataforma web para gerenciar solicitações, obras, denúncias e comunicados da Associação de Moradores Vizinhos JF, localizada no Jardim Franco, Macaé-RJ.

## Stack Tecnológico

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: API Routes do Next.js
- **Banco de Dados**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Storage**: Supabase Storage
- **Hospedagem**: Vercel (frontend) + Supabase Cloud (banco)

## Pré-requisitos

- Node.js 20 LTS
- npm
- Conta no Supabase (https://supabase.com)

## Instalação

### 1. Clonar o repositório

```bash
git clone <seu-repositorio>
cd vizinhos-jf
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
DATABASE_URL=postgresql://postgres:senha@db.seu-projeto.supabase.co:5432/postgres
WHATSAPP_NUMBER_DEFAULT=seu-numero-whatsapp
```

### 4. Executar migrações do Prisma

```bash
npx prisma migrate dev --name init
```

### 5. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`.

## Estrutura do Projeto

```
vizinhos-jf/
├── app/
│   ├── api/                    # Rotas de API
│   │   ├── solicitacoes/      # CRUD de solicitações
│   │   ├── obras/             # CRUD de obras
│   │   ├── denuncias/         # CRUD de denúncias
│   │   ├── comunicados/       # CRUD de comunicados
│   │   ├── conteudo-informativo/
│   │   ├── ocorrencias-obras/ # Ocorrências de obras
│   │   └── upload/            # Upload de fotos
│   ├── admin/                 # Painel administrativo
│   ├── solicitacoes/          # Páginas de solicitações
│   ├── obras/                 # Página de obras
│   ├── denuncias/             # Página de denúncias
│   ├── comunicados/           # Página de comunicados
│   ├── guia/                  # Guia informativo
│   ├── perfil/                # Perfil do usuário
│   └── page.tsx               # Página inicial
├── components/                # Componentes React reutilizáveis
├── lib/                       # Utilitários e configurações
│   ├── prisma.ts             # Cliente Prisma
│   ├── supabase.ts           # Cliente Supabase
│   ├── protocolo.ts          # Geração de protocolos
│   └── whatsapp.ts           # Utilitários WhatsApp
├── prisma/
│   └── schema.prisma         # Schema do banco de dados
├── middleware.ts             # Middleware de proteção de rotas
└── README.md
```

## Funcionalidades

### Para Moradores

- **Solicitações**: Criar e acompanhar solicitações de manutenção e infraestrutura
- **Obras**: Visualizar informações sobre obras em andamento
- **Denúncias**: Registrar denúncias de forma anônima ou identificada
- **Comunicados**: Receber comunicados da diretoria
- **Guia**: Acessar informações úteis e contatos importantes
- **Perfil**: Gerenciar informações pessoais

### Para Administradores

- **Painel Admin**: Gerenciar solicitações, obras e denúncias
- **Abas de Gestão**:
  - Pendentes: Solicitações aguardando análise
  - Obras: Gerenciar obras metropolitanas
  - Denúncias: Visualizar denúncias (apenas admin_master)
  - Resolvidas: Histórico de solicitações resolvidas

## Rotas de API

### Solicitações
- `GET /api/solicitacoes` — Listar solicitações
- `POST /api/solicitacoes` — Criar solicitação
- `PATCH /api/solicitacoes/[id]` — Atualizar status

### Obras
- `GET /api/obras` — Listar obras
- `POST /api/obras` — Criar obra (admin_master)
- `PATCH /api/obras` — Atualizar obra (admin_master)

### Denúncias
- `GET /api/denuncias` — Listar denúncias
- `POST /api/denuncias` — Criar denúncia

### Comunicados
- `GET /api/comunicados` — Listar comunicados
- `POST /api/comunicados` — Criar comunicado (diretoria/admin_master)

### Conteúdo Informativo
- `GET /api/conteudo-informativo` — Listar conteúdo
- `POST /api/conteudo-informativo` — Criar conteúdo (diretoria/admin_master)

### Upload
- `POST /api/upload` — Fazer upload de fotos

## Roles de Usuário

- **morador**: Usuário comum
- **diretoria**: Pode criar comunicados e conteúdo informativo
- **admin_master**: Acesso total ao painel administrativo
- **operador**: Acesso limitado ao painel (sem acesso a denúncias)

## Deploy

### Vercel (Frontend)

1. Faça push do código para o GitHub
2. Conecte o repositório à Vercel (https://vercel.com/new)
3. Adicione as variáveis de ambiente do `.env.local`
4. Faça o deploy

### Supabase (Banco de Dados)

O banco de dados já está hospedado no Supabase Cloud. Nenhuma ação adicional é necessária.

## Desenvolvimento

### Executar em modo desenvolvimento

```bash
npm run dev
```

### Build para produção

```bash
npm run build
```

## Troubleshooting

### Erro de conexão com banco de dados

Verifique se:
- A variável `DATABASE_URL` está corretamente configurada
- O projeto Supabase está ativo
- As credenciais estão corretas

### Erro ao fazer upload de fotos

Verifique se:
- O bucket `vizinhos-jf` existe no Supabase Storage
- As permissões de acesso estão configuradas corretamente
- A variável `SUPABASE_SERVICE_ROLE_KEY` está correta

## Próximos Passos

1. **Criar bucket no Supabase**: Acesse o painel do Supabase e crie um bucket chamado `vizinhos-jf` em Storage
2. **Executar migrações**: Execute `npx prisma migrate dev --name init` para criar as tabelas
3. **Seed do banco**: Crie usuários iniciais e dados de teste
4. **Deploy**: Faça o deploy para Vercel

---

**Desenvolvido para a Associação de Moradores Vizinhos JF — Jardim Franco, Macaé-RJ**
