import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const comunicados = await prisma.comunicado.findMany({
      orderBy: [{ fixado: 'desc' }, { criadoEm: 'desc' }],
      include: { autor: true }
    })

    return NextResponse.json({ sucesso: true, comunicados })
  } catch (erro) {
    console.error('Erro ao buscar comunicados:', erro)
    return NextResponse.json({ sucesso: false, erro: 'Erro ao buscar comunicados' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validar se o usuário tem papel de diretoria ou admin_master
    const usuario = await prisma.usuario.findUnique({
      where: { id: body.autorId }
    })

    if (!usuario || (usuario.papel !== 'diretoria' && usuario.papel !== 'admin_master')) {
      return NextResponse.json(
        { sucesso: false, erro: 'Apenas diretoria e admin_master podem criar comunicados' },
        { status: 403 }
      )
    }

    const comunicado = await prisma.comunicado.create({
      data: {
        titulo: body.titulo,
        conteudo: body.conteudo,
        categoria: body.categoria,
        fixado: body.fixado || false,
        autorId: body.autorId,
      },
      include: { autor: true }
    })

    return NextResponse.json({ sucesso: true, comunicado }, { status: 201 })
  } catch (erro) {
    console.error('Erro ao criar comunicado:', erro)
    return NextResponse.json({ sucesso: false, erro: 'Erro ao criar comunicado' }, { status: 500 })
  }
}
