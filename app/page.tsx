'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Card, CardBody, CardHeader } from '@/components/Card'
import { Button } from '@/components/Button'

interface Noticia {
  id: string
  titulo: string
  descricao: string
  data: string
  fonte: string
  link: string
  categoria: string
  imagem: string
}

export default function Home() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [loadingNoticias, setLoadingNoticias] = useState(true)

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await fetch('/api/noticias')
        if (response.ok) {
          const data = await response.json()
          setNoticias(data.noticias.slice(0, 3)) // Mostrar apenas 3 primeiras
        }
      } catch (erro) {
        console.error('Erro ao buscar notícias:', erro)
      } finally {
        setLoadingNoticias(false)
      }
    }

    fetchNoticias()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header title="Vizinhos JF" />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section - Simplified */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-8 mb-12">
          <h1 className="text-4xl font-bold mb-3">Bem-vindo ao Vizinhos JF</h1>
          <p className="text-lg mb-6 opacity-95">
            Plataforma de comunicação para a Associação de Moradores do Jardim Franco
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/solicitacoes/nova">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto">
                ✏️ Fazer Solicitação
              </Button>
            </Link>
            <Link href="/denuncias">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                🚨 Fazer Denúncia
              </Button>
            </Link>
          </div>
        </section>

        {/* Quick Access - 3 columns */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Link href="/solicitacoes">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
              <CardBody>
                <div className="text-center">
                  <div className="text-5xl mb-3">📋</div>
                  <h2 className="text-lg font-bold mb-1">Minhas Solicitações</h2>
                  <p className="text-sm text-gray-600">Acompanhe seus pedidos</p>
                </div>
              </CardBody>
            </Card>
          </Link>

          <Link href="/obras">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
              <CardBody>
                <div className="text-center">
                  <div className="text-5xl mb-3">🏗️</div>
                  <h2 className="text-lg font-bold mb-1">Obras em Andamento</h2>
                  <p className="text-sm text-gray-600">Status das obras</p>
                </div>
              </CardBody>
            </Card>
          </Link>

          <Link href="/comunicados">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
              <CardBody>
                <div className="text-center">
                  <div className="text-5xl mb-3">📢</div>
                  <h2 className="text-lg font-bold mb-1">Comunicados</h2>
                  <p className="text-sm text-gray-600">Notícias importantes</p>
                </div>
              </CardBody>
            </Card>
          </Link>
        </section>

        {/* News Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">📰 Notícias sobre Jardim Franco</h2>
            <Link href="/comunicados">
              <Button variant="secondary" size="sm">
                Ver Todas
              </Button>
            </Link>
          </div>

          {loadingNoticias ? (
            <div className="text-center py-8 text-gray-500">Carregando notícias...</div>
          ) : noticias.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {noticias.map((noticia) => (
                <a
                  key={noticia.id}
                  href={noticia.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                    <CardBody>
                      <div className="text-3xl mb-3">{noticia.imagem}</div>
                      <h3 className="font-bold text-sm mb-2 line-clamp-2">{noticia.titulo}</h3>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{noticia.descricao}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{noticia.fonte}</span>
                        <span>{formatDate(noticia.data)}</span>
                      </div>
                    </CardBody>
                  </Card>
                </a>
              ))}
            </div>
          ) : (
            <Card>
              <CardBody>
                <p className="text-center text-gray-600">Nenhuma notícia disponível</p>
              </CardBody>
            </Card>
          )}
        </section>

        {/* Additional Quick Links */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          <Link href="/denuncias">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardBody>
                <div className="text-center">
                  <div className="text-3xl mb-2">🚨</div>
                  <p className="text-sm font-medium">Denúncias</p>
                </div>
              </CardBody>
            </Card>
          </Link>

          <Link href="/guia">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardBody>
                <div className="text-center">
                  <div className="text-3xl mb-2">📚</div>
                  <p className="text-sm font-medium">Guia Macaé</p>
                </div>
              </CardBody>
            </Card>
          </Link>

          <Link href="/perfil">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardBody>
                <div className="text-center">
                  <div className="text-3xl mb-2">👤</div>
                  <p className="text-sm font-medium">Meu Perfil</p>
                </div>
              </CardBody>
            </Card>
          </Link>

          <Link href="/admin/login">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardBody>
                <div className="text-center">
                  <div className="text-3xl mb-2">🔐</div>
                  <p className="text-sm font-medium">Admin</p>
                </div>
              </CardBody>
            </Card>
          </Link>
        </section>

        {/* Info Section */}
        <section className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-8">
          <h3 className="font-bold mb-2">ℹ️ Como Funciona</h3>
          <ol className="text-sm text-gray-700 space-y-2">
            <li><strong>1.</strong> Faça uma solicitação ou denúncia</li>
            <li><strong>2.</strong> Receba um protocolo para acompanhar</li>
            <li><strong>3.</strong> Acompanhe o status em tempo real</li>
            <li><strong>4.</strong> Receba atualizações no WhatsApp</li>
          </ol>
        </section>
      </main>

      <footer className="bg-gray-900 text-white mt-12 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; 2026 Associação de Moradores Vizinhos JF — Jardim Franco, Macaé-RJ
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Desenvolvido para facilitar a comunicação entre moradores e a diretoria
          </p>
        </div>
      </footer>
    </div>
  )
}
