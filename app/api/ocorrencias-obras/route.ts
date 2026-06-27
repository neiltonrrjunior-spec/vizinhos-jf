import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { gerarProtocolo } from '@/lib/protocolo'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const protocolo = await gerarProtocolo('MET')

    const ocorrencia = await prisma.ocorrenciaObra.create({
      data: {
        protocolo,
        obraId: body.obraId,
        usuarioId: body.usuarioId,
        tipo: body.tipo,
        descricao: body.descricao,
        endereco: body.endereco,
        fotos: body.fotos || [],
        prioridade: body.prioridade,
      }
    })

    return NextResponse.json({ sucesso: true, ocorrencia }, { status: 201 })
  } catch (erro) {
    console.error('Erro ao criar ocorrencia:', erro)
    return NextResponse.json({ sucesso: false, erro: 'Erro ao criar ocorrência' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const obraId = searchParams.get('obraId')

    const ocorrencias = await prisma.ocorrenciaObra.findMany({
      where: obraId ? { obraId } : {},
      orderBy: { criadoEm: 'desc' }
    })

    return NextResponse.json({ sucesso: true, ocorrencias })
  } catch (erro) {
    console.error('Erro ao buscar ocorrencias:', erro)
    return NextResponse.json({ sucesso: false, erro: 'Erro ao buscar ocorrências' }, { status: 500 })
  }
}
