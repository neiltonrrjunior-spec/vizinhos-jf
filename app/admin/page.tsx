'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Card, CardBody, CardHeader } from '@/components/Card'
import { Button } from '@/components/Button'
import { Badge } from '@/components/Badge'

interface Solicitacao {
  id: string
  protocolo: string
  categoria: string
  status: string
  prioridade: string
  criadoEm: string
}

interface Denuncia {
  id: string
  protocolo: string
  tipo: string
  status: string
  anonima: boolean
  criadoEm: string
}

export default function AdminPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('pendentes')
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([])
  const [denuncias, setDenuncias] = useState<Denuncia[]>([])
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const role = localStorage.getItem('adminRole')

    if (!token) {
      router.push('/admin/login')
      return
    }

    setUserRole(role)
    fetchData()
  }, [router])

  const fetchData = async () => {
    try {
      const [solRes, denRes] = await Promise.all([
        fetch('/api/solicitacoes'),
        fetch('/api/denuncias'),
      ])

      if (solRes.ok) {
        const data = await solRes.json()
        setSolicitacoes(data.solicitacoes || [])
      }

      if (denRes.ok) {
        const data = await denRes.json()
        setDenuncias(data.denuncias || [])
      }
    } catch (err) {
      console.error('Erro ao buscar dados:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminRole')
    router.push('/admin/login')
  }

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

  const pendentes = solicitacoes.filter((s) => s.status === 'recebido')
  const resolvidas = solicitacoes.filter((s) => s.status === 'resolvido')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Painel Administrativo" showNav={false} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <Button variant="secondary" onClick={handleLogout}>
            Sair
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('pendentes')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'pendentes'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            📋 Pendentes ({pendentes.length})
          </button>
          <button
            onClick={() => setActiveTab('obras')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'obras'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            🏗️ Obras
          </button>
          {userRole === 'admin_master' && (
            <button
              onClick={() => setActiveTab('denuncias')}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === 'denuncias'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              ⚠️ Denúncias ({denuncias.length})
            </button>
          )}
          <button
            onClick={() => setActiveTab('resolvidas')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'resolvidas'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            ✓ Resolvidas ({resolvidas.length})
          </button>
        </div>

        {loading && <p className="text-center text-gray-600">Carregando...</p>}

        {/* Pendentes Tab */}
        {activeTab === 'pendentes' && !loading && (
          <div className="space-y-4">
            {pendentes.length === 0 ? (
              <Card>
                <CardBody>
                  <p className="text-center text-gray-600">Nenhuma solicitação pendente</p>
                </CardBody>
              </Card>
            ) : (
              pendentes.map((sol) => (
                <Card key={sol.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-lg font-bold">{sol.categoria}</h2>
                        <p className="text-gray-600 text-sm">Protocolo: {sol.protocolo}</p>
                      </div>
                      <Badge variant="warning">Pendente</Badge>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="flex gap-2">
                      <Badge variant="info">{sol.prioridade}</Badge>
                      <span className="text-sm text-gray-500">
                        {new Date(sol.criadoEm).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </CardBody>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Obras Tab */}
        {activeTab === 'obras' && !loading && (
          <Card>
            <CardBody>
              <p className="text-center text-gray-600">Gerenciamento de obras em desenvolvimento</p>
            </CardBody>
          </Card>
        )}

        {/* Denúncias Tab */}
        {activeTab === 'denuncias' && !loading && userRole === 'admin_master' && (
          <div className="space-y-4">
            {denuncias.length === 0 ? (
              <Card>
                <CardBody>
                  <p className="text-center text-gray-600">Nenhuma denúncia encontrada</p>
                </CardBody>
              </Card>
            ) : (
              denuncias.map((den) => (
                <Card key={den.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-lg font-bold">{den.tipo}</h2>
                        <p className="text-gray-600 text-sm">Protocolo: {den.protocolo}</p>
                      </div>
                      {den.anonima && <Badge variant="info">Anônima</Badge>}
                    </div>
                  </CardHeader>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Resolvidas Tab */}
        {activeTab === 'resolvidas' && !loading && (
          <div className="space-y-4">
            {resolvidas.length === 0 ? (
              <Card>
                <CardBody>
                  <p className="text-center text-gray-600">Nenhuma solicitação resolvida</p>
                </CardBody>
              </Card>
            ) : (
              resolvidas.map((sol) => (
                <Card key={sol.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-lg font-bold">{sol.categoria}</h2>
                        <p className="text-gray-600 text-sm">Protocolo: {sol.protocolo}</p>
                      </div>
                      <Badge variant="success">Resolvida</Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  )
}
