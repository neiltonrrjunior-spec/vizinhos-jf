'use client'

import React, { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { Card, CardBody, CardHeader } from '@/components/Card'
import { Badge } from '@/components/Badge'

interface Obra {
  id: string
  nome: string
  descricao: string
  endereco: string
  percentualProgresso: number
  status: string
  dataInicio: string
  previsaoFim: string
  empresaResponsavel: string
}

export default function ObrasPage() {
  const [obras, setObras] = useState<Obra[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchObras = async () => {
      try {
        const response = await fetch('/api/obras')
        if (!response.ok) throw new Error('Erro ao buscar obras')
        const data = await response.json()
        setObras(data.obras || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
      } finally {
        setLoading(false)
      }
    }

    fetchObras()
  }, [])

  const getStatusBadgeVariant = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
      mobilizacao: 'info',
      em_execucao: 'warning',
      concluida: 'success',
      paralisada: 'error',
    }
    return variants[status] || 'default'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Obras Metropolitana" />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Obras Metropolitana</h1>

        {loading && <p className="text-center text-gray-600">Carregando...</p>}
        {error && <p className="text-center text-red-600">Erro: {error}</p>}

        {!loading && obras.length === 0 && (
          <Card>
            <CardBody>
              <p className="text-center text-gray-600">Nenhuma obra encontrada</p>
            </CardBody>
          </Card>
        )}

        {!loading && obras.length > 0 && (
          <div className="space-y-4">
            {obras.map((obra) => (
              <Card key={obra.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold">{obra.nome}</h2>
                      <p className="text-gray-600">{obra.endereco}</p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(obra.status)}>
                      {obra.status.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="text-gray-700 mb-4">{obra.descricao}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Progresso</span>
                      <span className="text-sm font-medium">{obra.percentualProgresso}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${obra.percentualProgresso}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Início</p>
                      <p className="font-medium">
                        {new Date(obra.dataInicio).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Previsão de Fim</p>
                      <p className="font-medium">
                        {new Date(obra.previsaoFim).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Empresa Responsável</p>
                      <p className="font-medium">{obra.empresaResponsavel}</p>
                    </div>
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
