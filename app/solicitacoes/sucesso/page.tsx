'use client'

import React, { Suspense } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Card, CardBody, CardHeader } from '@/components/Card'
import { Button } from '@/components/Button'

function SucessoContent() {
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
  const protocolo = searchParams.get('protocolo')
  const linkWhatsApp = searchParams.get('linkWhatsApp')
  const mensagem = searchParams.get('mensagem')

  if (!protocolo) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Protocolo não encontrado. Redirecionando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header title="Solicitação Enviada" />

      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-block bg-green-100 rounded-full p-6 mb-4">
            <svg
              className="w-16 h-16 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Solicitação Enviada com Sucesso!
          </h1>
          <p className="text-gray-600">
            Sua solicitação foi registrada e será analisada em breve.
          </p>
        </div>

        {/* Protocol Card */}
        <Card className="mb-6 border-2 border-green-200">
          <CardHeader>
            <h2 className="text-lg font-bold text-gray-800">Seu Protocolo</h2>
          </CardHeader>
          <CardBody>
            <div className="bg-green-50 p-6 rounded-lg text-center mb-4">
              <p className="text-sm text-gray-600 mb-2">Número de Protocolo</p>
              <p className="text-4xl font-bold text-green-600 font-mono tracking-widest">
                {protocolo}
              </p>
            </div>
            <p className="text-sm text-gray-600 text-center">
              Guarde este número para acompanhar sua solicitação
            </p>
          </CardBody>
        </Card>

        {/* WhatsApp Action */}
        {linkWhatsApp && (
          <Card className="mb-6 bg-blue-50 border-l-4 border-blue-500">
            <CardBody>
              <h3 className="font-bold mb-3 text-gray-800">📱 Compartilhar no WhatsApp</h3>
              <p className="text-sm text-gray-700 mb-4">
                Clique abaixo para receber uma cópia da sua solicitação no WhatsApp:
              </p>
              <a href={linkWhatsApp} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  Enviar para WhatsApp
                </Button>
              </a>
            </CardBody>
          </Card>
        )}

        {/* Next Steps */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-lg font-bold">Próximos Passos</h2>
          </CardHeader>
          <CardBody>
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <span className="text-gray-700">
                  Sua solicitação foi recebida e será analisada pela diretoria
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <span className="text-gray-700">
                  Você receberá atualizações sobre o status da sua solicitação
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <span className="text-gray-700">
                  Acesse "Minhas Solicitações" para acompanhar o progresso
                </span>
              </li>
            </ol>
          </CardBody>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link href="/solicitacoes">
            <Button className="w-full">Ver Minhas Solicitações</Button>
          </Link>
          <Link href="/">
            <Button variant="secondary" className="w-full">
              Voltar ao Início
            </Button>
          </Link>
        </div>

        {/* Info */}
        <Card className="mt-6 bg-yellow-50 border-l-4 border-yellow-500">
          <CardBody>
            <p className="text-sm text-gray-700">
              <strong>💡 Dica:</strong> Salve seu protocolo em um lugar seguro. Você precisará dele
              para acompanhar sua solicitação.
            </p>
          </CardBody>
        </Card>
      </main>
    </div>
  )
}

export default function SucessoSolicitacaoPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Carregando...</div>}>
      <SucessoContent />
    </Suspense>
  )
}
