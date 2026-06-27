# Guia de Deploy — Vizinhos JF

Este documento descreve como fazer o deploy da aplicação Vizinhos JF para produção.

## Pré-requisitos

- Conta no GitHub
- Conta na Vercel (https://vercel.com)
- Projeto Supabase já configurado com banco de dados criado
- Variáveis de ambiente prontas

## Passo 1: Preparar o Repositório GitHub

### 1.1 Criar repositório no GitHub

1. Acesse https://github.com/new
2. Crie um novo repositório chamado `vizinhos-jf`
3. Escolha "Private" se desejar manter privado
4. Não inicialize com README (já temos um)

### 1.2 Fazer push do código

```bash
cd vizinhos-jf
git init
git add .
git commit -m "Initial commit: Vizinhos JF system"
git branch -M main
git remote add origin https://github.com/seu-usuario/vizinhos-jf.git
git push -u origin main
```

## Passo 2: Deploy na Vercel

### 2.1 Conectar repositório à Vercel

1. Acesse https://vercel.com/new
2. Clique em "Import Git Repository"
3. Selecione o repositório `vizinhos-jf`
4. Clique em "Import"

### 2.2 Configurar variáveis de ambiente

Na página de configuração do projeto na Vercel:

1. Vá para "Environment Variables"
2. Adicione as seguintes variáveis:

```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
DATABASE_URL=postgresql://postgres:senha@db.seu-projeto.supabase.co:5432/postgres
WHATSAPP_NUMBER_DEFAULT=seu-numero-whatsapp
```

### 2.3 Deploy

1. Clique em "Deploy"
2. Aguarde o build completar
3. Acesse a URL fornecida pela Vercel

## Passo 3: Configurar Supabase

### 3.1 Criar bucket para fotos

1. Acesse o painel do Supabase
2. Vá para "Storage"
3. Crie um novo bucket chamado `vizinhos-jf`
4. Configure as permissões:
   - Acesso público para leitura
   - Acesso autenticado para escrita

### 3.2 Executar migrações

```bash
# Localmente, antes de fazer push
npx prisma migrate dev --name init

# Ou na Vercel, via CLI
vercel env pull
npx prisma migrate deploy
```

### 3.3 Seed do banco (opcional)

Para popular o banco com dados iniciais:

```bash
npx prisma db seed
```

## Passo 4: Configurações Finais

### 4.1 Domínio customizado (opcional)

1. Na Vercel, vá para "Settings > Domains"
2. Adicione seu domínio customizado
3. Configure os registros DNS conforme instruído

### 4.2 Monitoramento

1. Configure alertas na Vercel
2. Monitore logs em tempo real
3. Configure backups automáticos no Supabase

## Passo 5: Testes em Produção

Após o deploy, teste todas as funcionalidades:

- [ ] Página inicial carrega corretamente
- [ ] Criar solicitação funciona
- [ ] Listar solicitações funciona
- [ ] Upload de fotos funciona
- [ ] Login administrativo funciona
- [ ] Painel administrativo funciona
- [ ] Comunicados aparecem
- [ ] Guia informativo funciona

## Troubleshooting

### Erro: "Database connection failed"

**Solução**: Verifique se a `DATABASE_URL` está correta e se o Supabase está ativo.

### Erro: "CORS error"

**Solução**: Configure CORS no Supabase:
1. Vá para "Settings > API"
2. Adicione a URL da Vercel em "Allowed Origins"

### Erro: "Storage bucket not found"

**Solução**: Crie o bucket `vizinhos-jf` no Supabase Storage.

## Rollback

Se precisar reverter para uma versão anterior:

1. Na Vercel, vá para "Deployments"
2. Encontre o deployment anterior
3. Clique em "Redeploy"

## Atualizações Futuras

Para fazer atualizações:

1. Faça as alterações localmente
2. Teste com `npm run dev`
3. Faça commit e push para GitHub
4. Vercel fará o deploy automaticamente

## Suporte

Para problemas:

1. Verifique os logs na Vercel
2. Verifique os logs no Supabase
3. Consulte a documentação do Next.js
4. Entre em contato com o suporte da Vercel ou Supabase

---

**Desenvolvido para a Associação de Moradores Vizinhos JF**
