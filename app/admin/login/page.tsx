'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardBody, CardHeader } from '@/components/Card'
import { Button } from '@/components/Button'

export default function AdminLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    telefone: '',
    senha: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // This is a placeholder - implement actual authentication
      if (formData.telefone && formData.senha) {
        // Store auth token in localStorage
        localStorage.setItem('adminToken', 'mock-token')
        localStorage.setItem('adminRole', 'admin_master')
        router.push('/admin')
      } else {
        setError('Telefone e senha são obrigatórios')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold text-center">Vizinhos JF</h1>
            <p className="text-center text-gray-600 text-sm mt-2">Painel Administrativo</p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="bg-red-100 text-red-800 p-4 rounded">{error}</div>}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(XX) XXXXX-XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Sua senha"
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-sm text-gray-600">
                Não é administrador?{' '}
                <Link href="/" className="text-blue-600 hover:underline">
                  Voltar ao início
                </Link>
              </p>
            </div>
          </CardBody>
        </Card>

        <div className="mt-4 text-center text-white text-sm">
          <p>Apenas administradores podem acessar este painel</p>
        </div>
      </div>
    </div>
  )
}
