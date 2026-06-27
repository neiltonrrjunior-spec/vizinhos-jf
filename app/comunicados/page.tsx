'use client'

import React, { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { Card, CardBody, CardHeader } from '@/components/Card'
import { Badge } from '@/components/Badge'

interface Comunicado {
  id: string
  titulo: string
  conteudo: string
  categoria: string
  fixado: boolean
  autor: {
    nome: string
  }
  criadoEm: string
}

export default function ComunicadosPage() {
  const [comunicados, setComunicados] = useState<Comunicado[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchComunicados = async () => {
      try {
        const response = await fetch('/api/comunicados')
        if (!response.ok) throw new Error('Erro ao buscar comunicados')
        const data = await response.json()
        setComunicados(data.comunicados || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
      } finally {
        setLoading(false)
      }
    }

    fetchComunicados()
  }, [])

  const getCategoryBadgeVariant = (categoria: string) => {
    const variants: Record<string, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
      assembleia: 'info',
      aviso: 'warning',
      obras: 'warning',
      solidariedade: 'success',
      enquete: 'info',
    }
    return variants[categoria] || 'default'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Comunicados" />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Comunicados</h1>

        {loading && <p className="text-center text-gray-600">Carregando...</p>}
        {error && <p className="text-center text-red-600">Erro: {error}</p>}

        {!loading && comunicados.length === 0 && (
          <Card>
            <CardBody>
              <p className="text-center text-gray-600">Nenhum comunicado encontrado</p>
            </CardBody>
          </Card>
        )}

        {!loading && comunicados.length > 0 && (
          <div className="space-y-4">
            {comunicados.map((com) => (
              <Card key={com.id} className={com.fixado ? 'border-l-4 border-yellow-500' : ''}>
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {com.fixado && <span className="text-yellow-600">📌 Fixado</span>}
                        <h2 className="text-xl font-bold">{com.titulo}</h2>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Por {com.autor.nome} em{' '}
                        {new Date(com.criadoEm).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <Badge variant={getCategoryBadgeVariant(com.categoria)}>
                      {com.categoria}
                    </Badge>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="text-gray-700 whitespace-pre-wrap">{com.conteudo}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
