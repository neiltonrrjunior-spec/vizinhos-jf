import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    // Dados de notícias sobre Jardim Franco e Metropolitana
    // Em produção, isso poderia vir de um RSS feed ou API de notícias
    const noticias = [
      {
        id: '1',
        titulo: 'Obras de urbanização avançam para transformar realidade no Jardim Franco',
        descricao: 'As obras de urbanização do Jardim Franco estão mudando a realidade do bairro com serviços que incluem implantação de redes de drenagem, esgoto e pavimentação.',
        data: new Date('2025-09-08'),
        fonte: 'Prefeitura de Macaé',
        link: 'https://www.macae.rj.gov.br/noticias/leitura/noticia/obras-de-urbanizacao-avancam-para-transformar-realidade-no-jardim-franco',
        categoria: 'obras',
        imagem: '🏗️'
      },
      {
        id: '2',
        titulo: 'Infraestrutura e qualidade de vida chegando ao Jardim Franco',
        descricao: 'O bairro está recebendo obras de urbanização com drenagem, rede de esgoto, pavimentação e calçadas. Intervenções que levam mais infraestrutura.',
        data: new Date('2025-09-23'),
        fonte: 'Prefeitura de Macaé',
        link: 'https://www.instagram.com/reel/DO-3hWckYx_/',
        categoria: 'infraestrutura',
        imagem: '🏢'
      },
      {
        id: '3',
        titulo: 'Bairros de Macaé seguem recebendo obras para coleta e tratamento de esgoto',
        descricao: 'A ampliação do sistema para coleta e tratamento de esgoto segue em Macaé e as obras para implantação das estruturas avançam nos bairros.',
        data: new Date('2025-09-15'),
        fonte: 'BRK Ambiental',
        link: 'https://www.brkambiental.com.br/bairros-de-macae-rj-seguem-recebendo-obras-para-coleta-e-tratamento-de-esgoto',
        categoria: 'saneamento',
        imagem: '💧'
      },
      {
        id: '4',
        titulo: 'Infraestrutura sob pressão em Macaé',
        descricao: 'Moradores do Jardim Franco organizaram manifestação para cobrar respostas sobre o andamento das obras de infraestrutura.',
        data: new Date('2026-02-23'),
        fonte: 'Notícias Locais',
        link: '#',
        categoria: 'mobilizacao',
        imagem: '📢'
      }
    ]

    // Ordenar por data mais recente
    noticias.sort((a, b) => b.data.getTime() - a.data.getTime())

    return NextResponse.json({
      sucesso: true,
      noticias: noticias.map(n => ({
        ...n,
        data: n.data.toISOString()
      }))
    })
  } catch (erro) {
    console.error('Erro ao buscar notícias:', erro)
    return NextResponse.json(
      { sucesso: false, erro: 'Erro ao buscar notícias' },
      { status: 500 }
    )
  }
}
