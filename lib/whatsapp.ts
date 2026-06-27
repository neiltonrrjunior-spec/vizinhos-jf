export function gerarMensagemSolicitacao(
  protocolo: string,
  categoria: string,
  descricao: string,
  status: string
): string {
  const data = new Date().toLocaleDateString('pt-BR')
  const hora = new Date().toLocaleTimeString('pt-BR')

  return `*Vizinhos JF — Solicitação Recebida*

📋 *Protocolo:* ${protocolo}
📁 *Categoria:* ${categoria}
📝 *Descrição:* ${descricao}
⚠️ *Status:* ${status}

📅 *Recebido em:* ${data} às ${hora}
━━━━━━━━━━━━━━━━━━━━
💬 Para dúvidas, responda esta mensagem ou acesse o app Vizinhos JF.
_Associação de Moradores Vizinhos JF — Jardim Franco, Macaé-RJ_`
}

export function gerarLinkWhatsApp(mensagem: string, telefone?: string): string {
  const textoCodificado = encodeURIComponent(mensagem)
  const telefoneLimpo = telefone?.replace(/\D/g, '')
  return telefoneLimpo
    ? `https://wa.me/55${telefoneLimpo}?text=${textoCodificado}`
    : `https://wa.me/?text=${textoCodificado}`
}
