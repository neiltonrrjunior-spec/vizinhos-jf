import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const secao = searchParams.get('secao')

    const conteudo = await prisma.conteudoInformativo.findMany({
      where: secao ? { secao: secao as any } : {},
      orderBy: { ordem: 'asc' }
    })

    return NextResponse.json({ sucesso: true, conteudo })
  } catch (erro) {
    console.error('Erro ao buscar conteudo informativo:', erro)
    return NextResponse.json({ sucesso: false, erro: 'Erro ao buscar conteúdo informativo' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validar se o usuário tem papel de diretoria ou admin_master
    const usuario = await prisma.usuario.findUnique({
      where: { id: body.usuarioId }
    })

    if (!usuario || (usuario.papel !== 'diretoria' && usuario.papel !== 'admin_master')) {
      return NextResponse.json(
        { sucesso: false, erro: 'Apenas diretoria e admin_master podem criar conteúdo informativo' },
        { status: 403 }
      )
    }

    const conteudo = await prisma.conteudoInformativo.create({
      data: {
        secao: body.secao,
        titulo: body.titulo,
        descricao: body.descricao || null,
        telefone: body.telefone || null,
        link: body.link || null,
        ordem: body.ordem || 0,
      }
    })

    return NextResponse.json({ sucesso: true, conteudo }, { status: 201 })
  } catch (erro) {
    console.error('Erro ao criar conteudo informativo:', erro)
    return NextResponse.json({ sucesso: false, erro: 'Erro ao criar conteúdo informativo' }, { status: 500 })
  }
}
