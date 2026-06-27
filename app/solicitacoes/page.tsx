'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Card, CardBody, CardHeader } from '@/components/Card'
import { Button } from '@/components/Button'
import { Badge } from '@/components/Badge'

interface Solicitacao {
  id: string
  protocolo: string
  categoria: string
  descricao: string
  status: string
  prioridade: string
  criadoEm: string
}

export default function SolicitacoesPage() {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSolicitacoes = async () => {
      try {
        const response = await fetch('/api/solicitacoes')
        if (!response.ok) throw new Error('Erro ao buscar solicitações')
        const data = await response.json()
        setSolicitacoes(data.solicitacoes || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
      } finally {
        setLoading(false)
      }
    }

    fetchSolicitacoes()
  }, [])

  const getStatusBadgeVariant = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
      recebido: 'info',
      em_analise: 'warning',
      encaminhado: 'warning',
      em_execucao: 'warning',
      resolvido: 'success',
      arquivado: 'default',
    }
    return variants[status] || 'default'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Minhas Solicitações" />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Minhas Solicitações</h1>
          <Link href="/solicitacoes/nova">
            <Button>+ Nova Solicitação</Button>
          </Link>
        </div>

        {loading && <p className="text-center text-gray-600">Carregando...</p>}
        {error && <p className="text-center text-red-600">Erro: {error}</p>}

        {!loading && solicitacoes.length === 0 && (
          <Card>
            <CardBody>
              <p className="text-center text-gray-600">Nenhuma solicitação encontrada</p>
            </CardBody>
          </Card>
        )}

        {!loading && solicitacoes.length > 0 && (
          <div className="space-y-4">
            {solicitacoes.map((sol) => (
              <Card key={sol.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold">{sol.categoria}</h2>
                      <p className="text-gray-600">Protocolo: {sol.protocolo}</p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(sol.status)}>
                      {sol.status.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="text-gray-700 mb-4">{sol.descricao}</p>
                  <div className="flex gap-2">
                    <Badge variant="info">{sol.prioridade}</Badge>
                    <span className="text-sm text-gray-500">
                      {new Date(sol.criadoEm).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
