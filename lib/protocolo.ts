import { prisma } from './prisma'

type Prefixo = 'VJF' | 'MET' | 'DEN'

export async function gerarProtocolo(prefixo: Prefixo): Promise<string> {
  const ano = new Date().getFullYear()
  let contagem: number

  if (prefixo === 'VJF') {
    contagem = await prisma.solicitacao.count({
      where: { protocolo: { startsWith: `${prefixo}-${ano}` } }
    })
  } else if (prefixo === 'MET') {
    contagem = await prisma.ocorrenciaObra.count({
      where: { protocolo: { startsWith: `${prefixo}-${ano}` } }
    })
  } else {
    contagem = await prisma.denuncia.count({
      where: { protocolo: { startsWith: `${prefixo}-${ano}` } }
    })
  }

  const numero = String(contagem + 1).padStart(4, '0')
  return `${prefixo}-${ano}-${numero}`
}
