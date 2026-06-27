import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const obras = await prisma.obraMetropolitana.findMany({
      orderBy: { dataInicio: 'desc' }
    })

    return NextResponse.json({ sucesso: true, obras })
  } catch (erro) {
    console.error('Erro ao buscar obras:', erro)
    return NextResponse.json({ sucesso: false, erro: 'Erro ao buscar obras' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validar se o usuário é admin_master
    const usuario = await prisma.usuario.findUnique({
      where: { id: body.usuarioId }
    })

    if (!usuario || usuario.papel !== 'admin_master') {
      return NextResponse.json(
        { sucesso: false, erro: 'Apenas admin_master pode criar obras' },
        { status: 403 }
      )
    }

    const obra = await prisma.obraMetropolitana.create({
      data: {
        nome: body.nome,
        descricao: body.descricao,
        endereco: body.endereco,
        percentualProgresso: body.percentualProgresso || 0,
        status: body.status || 'mobilizacao',
        dataInicio: new Date(body.dataInicio),
        previsaoFim: new Date(body.previsaoFim),
        empresaResponsavel: body.empresaResponsavel || 'Metropolitana',
        numeroContrato: body.numeroContrato,
      }
    })

    return NextResponse.json({ sucesso: true, obra }, { status: 201 })
  } catch (erro) {
    console.error('Erro ao criar obra:', erro)
    return NextResponse.json({ sucesso: false, erro: 'Erro ao criar obra' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validar se o usuário é admin_master
    const usuario = await prisma.usuario.findUnique({
      where: { id: body.usuarioId }
    })

    if (!usuario || usuario.papel !== 'admin_master') {
      return NextResponse.json(
        { sucesso: false, erro: 'Apenas admin_master pode atualizar obras' },
        { status: 403 }
      )
    }

    const obra = await prisma.obraMetropolitana.update({
      where: { id: body.id },
      data: {
        percentualProgresso: body.percentualProgresso,
        status: body.status,
      }
    })

    return NextResponse.json({ sucesso: true, obra })
  } catch (erro) {
    console.error('Erro ao atualizar obra:', erro)
    return NextResponse.json({ sucesso: false, erro: 'Erro ao atualizar obra' }, { status: 500 })
  }
}
