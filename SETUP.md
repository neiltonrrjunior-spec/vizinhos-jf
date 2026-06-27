# Guia de Configuração Local — Vizinhos JF

Este documento descreve como configurar o projeto localmente para desenvolvimento.

## Pré-requisitos

- Node.js 20 LTS (https://nodejs.org)
- npm (vem com Node.js)
- Git (https://git-scm.com)
- Conta no Supabase (https://supabase.com)

## Passo 1: Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/vizinhos-jf.git
cd vizinhos-jf
```

## Passo 2: Instalar Dependências

```bash
npm install
```

## Passo 3: Configurar Variáveis de Ambiente

### 3.1 Criar arquivo `.env.local`

Na raiz do projeto, crie um arquivo chamado `.env.local`:

```bash
touch .env.local
```

### 3.2 Preencher variáveis

Abra o arquivo `.env.local` e adicione:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
DATABASE_URL=postgresql://postgres:senha@db.seu-projeto.supabase.co:5432/postgres
WHATSAPP_NUMBER_DEFAULT=seu-numero-whatsapp
```

### 3.3 Obter as chaves do Supabase

1. Acesse https://supabase.com
2. Faça login ou crie uma conta
3. Crie um novo projeto
4. Vá para "Project Settings > API"
5. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`
6. Vá para "Project Settings > Database"
7. Copie a **Connection string** (URI mode) → `DATABASE_URL`

## Passo 4: Executar Migrações

```bash
npx prisma migrate dev --name init
```

Isso criará as tabelas no banco de dados.

## Passo 5: Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`.

## Passo 6: Testar a Aplicação

Abra o navegador e acesse:

- **Página inicial**: http://localhost:3000
- **Solicitações**: http://localhost:3000/solicitacoes
- **Obras**: http://localhost:3000/obras
- **Denúncias**: http://localhost:3000/denuncias
- **Comunicados**: http://localhost:3000/comunicados
- **Guia**: http://localhost:3000/guia
- **Perfil**: http://localhost:3000/perfil
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin

## Estrutura de Pastas

```
vizinhos-jf/
├── app/                    # Páginas e rotas
│   ├── api/               # Rotas de API
│   ├── admin/             # Páginas administrativas
│   ├── solicitacoes/      # Páginas de solicitações
│   ├── obras/             # Página de obras
│   ├── denuncias/         # Página de denúncias
│   ├── comunicados/       # Página de comunicados
│   ├── guia/              # Página de guia
│   ├── perfil/            # Página de perfil
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes React reutilizáveis
│   ├── Badge.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Header.tsx
├── lib/                   # Utilitários e configurações
│   ├── prisma.ts         # Cliente Prisma
│   ├── supabase.ts       # Cliente Supabase
│   ├── protocolo.ts      # Geração de protocolos
│   └── whatsapp.ts       # Utilitários WhatsApp
├── prisma/
│   ├── schema.prisma     # Schema do banco de dados
│   └── migrations/       # Histórico de migrações
├── public/               # Arquivos estáticos
├── .env.local            # Variáveis de ambiente (não commitar)
├── middleware.ts         # Middleware de proteção de rotas
├── tsconfig.json         # Configuração TypeScript
├── tailwind.config.ts    # Configuração Tailwind CSS
├── next.config.ts        # Configuração Next.js
├── package.json          # Dependências do projeto
└── README.md             # Documentação
```

## Comandos Úteis

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start

# Linter
npm run lint
```

### Prisma

```bash
# Criar nova migração
npx prisma migrate dev --name nome-da-migracao

# Visualizar banco de dados (Prisma Studio)
npx prisma studio

# Gerar cliente Prisma
npx prisma generate
```

### Git

```bash
# Ver status
git status

# Adicionar alterações
git add .

# Fazer commit
git commit -m "Descrição das alterações"

# Fazer push
git push origin main
```

## Troubleshooting

### Erro: "Cannot find module '@prisma/client'"

**Solução**: Execute `npm install` novamente.

### Erro: "Database connection failed"

**Solução**: Verifique se a `DATABASE_URL` está correta no `.env.local`.

### Erro: "Port 3000 is already in use"

**Solução**: Execute em uma porta diferente:
```bash
npm run dev -- -p 3001
```

### Erro: "Module not found"

**Solução**: Limpe o cache e reinstale:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Próximas Etapas

1. **Familiarize-se com o código**: Explore os arquivos e entenda a estrutura
2. **Teste as funcionalidades**: Crie solicitações, denúncias, etc.
3. **Customize conforme necessário**: Adapte cores, textos, etc.
4. **Faça deploy**: Siga o guia em `DEPLOY.md`

## Recursos Úteis

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

**Desenvolvido para a Associação de Moradores Vizinhos JF**
