'use client'

import React, { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { Card, CardBody, CardHeader } from '@/components/Card'

interface ConteudoInformativo {
  id: string
  secao: string
  titulo: string
  descricao?: string
  telefone?: string
  link?: string
}

export default function GuiaPage() {
  const [conteudo, setConteudo] = useState<ConteudoInformativo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [secaoSelecionada, setSecaoSelecionada] = useState<string | null>(null)

  useEffect(() => {
    const fetchConteudo = async () => {
      try {
        const response = await fetch('/api/conteudo-informativo')
        if (!response.ok) throw new Error('Erro ao buscar conteúdo')
        const data = await response.json()
        setConteudo(data.conteudo || [])
        if (data.conteudo && data.conteudo.length > 0) {
          setSecaoSelecionada(data.conteudo[0].secao)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
      } finally {
        setLoading(false)
      }
    }

    fetchConteudo()
  }, [])

  const secoes = Array.from(new Set(conteudo.map((c) => c.secao)))
  const conteudoFiltrado = secaoSelecionada
    ? conteudo.filter((c) => c.secao === secaoSelecionada)
    : []

  const getSecaoIcon = (secao: string) => {
    const icons: Record<string, string> = {
      emergencia: '🚨',
      prefeitura: '🏛️',
      ferramentas: '🔧',
      direitos: '⚖️',
    }
    return icons[secao] || '📋'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Guia Macaé" />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Guia Macaé</h1>

        {loading && <p className="text-center text-gray-600">Carregando...</p>}
        {error && <p className="text-center text-red-600">Erro: {error}</p>}

        {!loading && conteudo.length === 0 && (
          <Card>
            <CardBody>
              <p className="text-center text-gray-600">Nenhum conteúdo encontrado</p>
            </CardBody>
          </Card>
        )}

        {!loading && conteudo.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardBody>
                  <h2 className="font-bold mb-4">Seções</h2>
                  <div className="space-y-2">
                    {secoes.map((secao) => (
                      <button
                        key={secao}
                        onClick={() => setSecaoSelecionada(secao)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          secaoSelecionada === secao
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {getSecaoIcon(secao)} {secao}
                      </button>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {conteudoFiltrado.map((item) => (
                  <Card key={item.id}>
                    <CardHeader>
                      <h2 className="text-xl font-bold">{item.titulo}</h2>
                    </CardHeader>
                    <CardBody>
                      {item.descricao && (
                        <p className="text-gray-700 mb-4">{item.descricao}</p>
                      )}

                      <div className="space-y-2">
                        {item.telefone && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">📞 Telefone:</span>
                            <a
                              href={`tel:${item.telefone}`}
                              className="text-blue-600 hover:underline"
                            >
                              {item.telefone}
                            </a>
                          </div>
                        )}

                        {item.link && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">🔗 Link:</span>
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Acessar
                            </a>
                          </div>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
