import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { gerarProtocolo } from '@/lib/protocolo'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const protocolo = await gerarProtocolo('DEN')

    const denuncia = await prisma.denuncia.create({
      data: {
        protocolo,
        anonima: body.anonima,
        // REGRA CRÍTICA: se anonima = true, usuarioId DEVE ser null, mesmo que venha preenchido no body
        usuarioId: body.anonima ? null : body.usuarioId,
        tipo: body.tipo,
        descricao: body.descricao,
        endereco: body.endereco,
        quandoOcorreu: body.quandoOcorreu,
        fotos: body.fotos || [],
        querAcompanhar: body.anonima ? false : body.querAcompanhar,
      }
    })

    return NextResponse.json({ sucesso: true, protocolo: denuncia.protocolo }, { status: 201 })
  } catch (erro) {
    console.error('Erro ao criar denuncia:', erro)
    return NextResponse.json({ sucesso: false, erro: 'Erro ao registrar denúncia' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const denuncias = await prisma.denuncia.findMany({
      orderBy: { criadoEm: 'desc' }
    })

    return NextResponse.json({ sucesso: true, denuncias })
  } catch (erro) {
    console.error('Erro ao buscar denuncias:', erro)
    return NextResponse.json({ sucesso: false, erro: 'Erro ao buscar denúncias' }, { status: 500 })
  }
}
