import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (!body.telefone) {
      return NextResponse.json(
        { sucesso: false, erro: 'Telefone é obrigatório' },
        { status: 400 }
      )
    }

    // Verificar se o usuário já existe pelo telefone
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { telefone: body.telefone }
    })

    if (usuarioExistente) {
      return NextResponse.json(
        { sucesso: true, usuario: usuarioExistente, novoUsuario: false },
        { status: 200 }
      )
    }

    // Criar novo usuário
    const usuario = await prisma.usuario.create({
      data: {
        nome: body.nome,
        telefone: body.telefone,
        email: body.email || null,
        endereco: body.endereco,
        bairro: body.bairro || 'Jardim Franco',
        papel: 'morador',
      }
    })

    return NextResponse.json(
      { sucesso: true, usuario, novoUsuario: true },
      { status: 201 }
    )
  } catch (erro: any) {
    console.error('Erro ao criar usuário:', erro)
    
    // Fornecer erro detalhado para diagnóstico
    let mensagemErro = 'Erro ao conectar ao banco de dados'
    if (erro.code === 'P2002') mensagemErro = 'Este telefone já está cadastrado'
    if (erro.message?.includes('Can\'t reach database')) mensagemErro = 'Não foi possível alcançar o banco de dados. Verifique a DATABASE_URL na Vercel.'
    if (erro.message?.includes('Authentication failed')) mensagemErro = 'Falha na autenticação do banco de dados. Verifique a senha na DATABASE_URL.'

    return NextResponse.json(
      { 
        sucesso: false, 
        erro: mensagemErro,
        detalhes: erro.message,
        codigo: erro.code
      },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const telefone = searchParams.get('telefone')

    if (!telefone) {
      return NextResponse.json(
        { sucesso: false, erro: 'Telefone é obrigatório' },
        { status: 400 }
      )
    }

    const usuario = await prisma.usuario.findUnique({
      where: { telefone }
    })

    return NextResponse.json(
      { sucesso: true, usuario, encontrado: !!usuario },
      { status: 200 }
    )
  } catch (erro: any) {
    console.error('Erro ao buscar usuário:', erro)
    return NextResponse.json(
      { 
        sucesso: false, 
        erro: 'Erro ao buscar usuário',
        detalhes: erro.message 
      },
      { status: 500 }
    )
  }
}
