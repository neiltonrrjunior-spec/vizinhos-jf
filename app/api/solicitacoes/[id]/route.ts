import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const body = await req.json()
    const solicitacao = await prisma.solicitacao.update({
      where: { id },
      data: { status: body.status }
    })
    return NextResponse.json({ sucesso: true, solicitacao })
  } catch (erro) {
    console.error('Erro ao atualizar solicitacao:', erro)
    return NextResponse.json({ sucesso: false, erro: 'Erro ao atualizar' }, { status: 500 })
  }
}
