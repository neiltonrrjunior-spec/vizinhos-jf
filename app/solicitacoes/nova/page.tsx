'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Card, CardBody, CardHeader } from '@/components/Card'
import { Button } from '@/components/Button'

export default function NovaSolicitacaoPage() {
  const router = useRouter()
  const [step, setStep] = useState<'registro' | 'solicitacao'>('registro')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<{msg: string, detalhes?: string} | null>(null)
  const [usuarioId, setUsuarioId] = useState<string | null>(null)
  const [usuarioNome, setUsuarioNome] = useState<string | null>(null)

  const [registroData, setRegistroData] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: '',
    bairro: 'Jardim Franco',
  })

  const [solicitacaoData, setSolicitacaoData] = useState({
    categoria: '',
    subcategoria: '',
    descricao: '',
    endereco: '',
    prioridade: 'media',
    familiasAfetadas: '',
  })

  const handleRegistroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setRegistroData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSolicitacaoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSolicitacaoData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registroData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError({
          msg: data.erro || 'Erro ao registrar usuário',
          detalhes: data.detalhes
        })
        return
      }

      setUsuarioId(data.usuario.id)
      setUsuarioNome(data.usuario.nome)
      setStep('solicitacao')
      setSolicitacaoData((prev) => ({
        ...prev,
        endereco: registroData.endereco,
      }))
    } catch (err) {
      setError({
        msg: 'Erro de conexão com o servidor',
        detalhes: err instanceof Error ? err.message : 'Erro desconhecido'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSolicitacao = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/solicitacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...solicitacaoData,
          usuarioId,
          familiasAfetadas: solicitacaoData.familiasAfetadas ? parseInt(solicitacaoData.familiasAfetadas) : null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError({
          msg: data.erro || 'Erro ao criar solicitação',
          detalhes: data.detalhes
        })
        return
      }

      const params = new URLSearchParams({
        protocolo: data.protocolo,
        linkWhatsApp: data.linkWhatsApp,
        mensagem: data.mensagem,
      })
      router.push(`/solicitacoes/sucesso?${params.toString()}`)
    } catch (err) {
      setError({
        msg: 'Erro de conexão com o servidor',
        detalhes: err instanceof Error ? err.message : 'Erro desconhecido'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Nova Solicitação" />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Nova Solicitação</h1>

        {/* Progress Indicator */}
        <div className="flex gap-4 mb-8">
          <div className={`flex-1 h-2 rounded ${step === 'registro' ? 'bg-blue-600' : 'bg-green-600'}`} />
          <div className={`flex-1 h-2 rounded ${step === 'solicitacao' ? 'bg-blue-600' : 'bg-gray-300'}`} />
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-bold text-red-800">{error.msg}</h3>
                {error.detalhes && (
                  <div className="mt-2 text-xs text-red-700 bg-red-100 p-2 rounded font-mono break-all">
                    {error.detalhes}
                  </div>
                )}
                <p className="mt-2 text-xs text-red-600">
                  Dica: Verifique se a DATABASE_URL na Vercel está correta e com a senha Carolzinha*18
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Registration */}
        {step === 'registro' && (
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Passo 1: Seus Dados</h2>
              <p className="text-sm text-gray-600 mt-2">
                Precisamos de algumas informações para registrá-lo no sistema
              </p>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleRegistro} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={registroData.nome}
                    onChange={handleRegistroChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    name="telefone"
                    value={registroData.telefone}
                    onChange={handleRegistroChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(XX) XXXXX-XXXX"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Usaremos este número para enviar atualizações sobre sua solicitação
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={registroData.email}
                    onChange={handleRegistroChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Endereço *
                  </label>
                  <input
                    type="text"
                    name="endereco"
                    value={registroData.endereco}
                    onChange={handleRegistroChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Rua, número, complemento"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bairro
                  </label>
                  <select
                    name="bairro"
                    value={registroData.bairro}
                    onChange={handleRegistroChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Jardim Franco">Jardim Franco</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? 'Processando...' : 'Continuar'}
                </Button>
              </form>
            </CardBody>
          </Card>
        )}

        {/* Step 2: Solicitacao */}
        {step === 'solicitacao' && (
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Passo 2: Sua Solicitação</h2>
              <p className="text-sm text-gray-600 mt-2">
                Descreva o problema ou pedido que você gostaria de fazer
              </p>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSolicitacao} className="space-y-6">
                <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
                  <p className="text-sm text-gray-700">
                    <strong>Registrado como:</strong> {usuarioNome}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria *
                  </label>
                  <select
                    name="categoria"
                    value={solicitacaoData.categoria}
                    onChange={handleSolicitacaoChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="infraestrutura">Infraestrutura</option>
                    <option value="manutencao">Manutenção</option>
                    <option value="seguranca">Segurança</option>
                    <option value="limpeza">Limpeza</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategoria *
                  </label>
                  <input
                    type="text"
                    name="subcategoria"
                    value={solicitacaoData.subcategoria}
                    onChange={handleSolicitacaoChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Buraco na rua, Vazamento, etc"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição Detalhada *
                  </label>
                  <textarea
                    name="descricao"
                    value={solicitacaoData.descricao}
                    onChange={handleSolicitacaoChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Descreva detalhadamente o problema..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Endereço Específico *
                  </label>
                  <input
                    type="text"
                    name="endereco"
                    value={solicitacaoData.endereco}
                    onChange={handleSolicitacaoChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Onde exatamente está o problema?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prioridade
                  </label>
                  <select
                    name="prioridade"
                    value={solicitacaoData.prioridade}
                    onChange={handleSolicitacaoChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Famílias Afetadas
                  </label>
                  <input
                    type="number"
                    name="familiasAfetadas"
                    value={solicitacaoData.familiasAfetadas}
                    onChange={handleSolicitacaoChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Quantas famílias são afetadas?"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setStep('registro')}
                    disabled={loading}
                    className="flex-1"
                  >
                    Voltar
                  </Button>
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? 'Enviando...' : 'Enviar Solicitação'}
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        )}
      </main>
    </div>
  )
}
