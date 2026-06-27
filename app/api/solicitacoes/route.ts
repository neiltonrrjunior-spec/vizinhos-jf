import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { gerarProtocolo } from '@/lib/protocolo'
import { gerarMensagemSolicitacao, gerarLinkWhatsApp } from '@/lib/whatsapp'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const protocolo = await gerarProtocolo('VJF')

    // Buscar usuário para obter telefone
    const usuario = await prisma.usuario.findUnique({
      where: { id: body.usuarioId }
    })

    if (!usuario) {
      return NextResponse.json(
        { sucesso: false, erro: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    const solicitacao = await prisma.solicitacao.create({
      data: {
        protocolo,
        usuarioId: body.usuarioId,
        categoria: body.categoria,
        subcategoria: body.subcategoria,
        descricao: body.descricao,
        endereco: body.endereco,
        prioridade: body.prioridade,
        familiasAfetadas: body.familiasAfetadas || null,
        fotos: body.fotos || [],
      }
    })

    // Gerar mensagem e link do WhatsApp
    const mensagem = gerarMensagemSolicitacao(
      protocolo,
      body.categoria,
      body.descricao,
      'recebido'
    )
    const linkWhatsApp = gerarLinkWhatsApp(mensagem, usuario.telefone)

    return NextResponse.json(
      {
        sucesso: true,
        solicitacao,
        protocolo,
        linkWhatsApp,
        mensagem,
        usuarioTelefone: usuario.telefone
      },
      { status: 201 }
    )
  } catch (erro) {
    console.error('Erro ao criar solicitacao:', erro)
    return NextResponse.json(
      { sucesso: false, erro: 'Erro ao criar solicitação' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const usuarioId = searchParams.get('usuarioId')

    const solicitacoes = await prisma.solicitacao.findMany({
      where: usuarioId ? { usuarioId } : {},
      include: {
        usuario: {
          select: { nome: true, telefone: true }
        }
      },
      orderBy: { criadoEm: 'desc' }
    })

    return NextResponse.json({ sucesso: true, solicitacoes })
  } catch (erro) {
    console.error('Erro ao buscar solicitacoes:', erro)
    return NextResponse.json(
      { sucesso: false, erro: 'Erro ao buscar solicitações' },
      { status: 500 }
    )
  }
}
