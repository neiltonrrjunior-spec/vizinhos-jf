'use client'

import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { Card, CardBody, CardHeader } from '@/components/Card'
import { Button } from '@/components/Button'

export default function DenunciasPage() {
  const [formData, setFormData] = useState({
    anonima: true,
    tipo: '',
    descricao: '',
    endereco: '',
    quandoOcorreu: '',
    querAcompanhar: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [protocolo, setProtocolo] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch('/api/denuncias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Erro ao registrar denúncia')
      }

      const data = await response.json()
      setProtocolo(data.protocolo)
      setSuccess(true)
      setFormData({
        anonima: true,
        tipo: '',
        descricao: '',
        endereco: '',
        quandoOcorreu: '',
        querAcompanhar: false,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Canal de Denúncias" />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Canal de Denúncias</h1>

        {success && (
          <Card className="mb-8 bg-green-50 border-l-4 border-green-600">
            <CardBody>
              <p className="text-green-800 font-medium mb-2">✓ Denúncia registrada com sucesso!</p>
              <p className="text-green-700">Protocolo: <strong>{protocolo}</strong></p>
              <p className="text-green-700 text-sm mt-2">
                Guarde este número para acompanhar sua denúncia.
              </p>
            </CardBody>
          </Card>
        )}

        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Registre sua denúncia</h2>
            <p className="text-gray-600 text-sm mt-2">
              Você pode fazer uma denúncia de forma anônima ou identificada.
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="bg-red-100 text-red-800 p-4 rounded">{error}</div>}

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="anonima"
                    checked={formData.anonima}
                    onChange={handleChange}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-medium">Denúncia Anônima</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Denúncia *
                </label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione um tipo</option>
                  <option value="vandalismo">Vandalismo</option>
                  <option value="roubo">Roubo</option>
                  <option value="barulho">Barulho Excessivo</option>
                  <option value="negligencia">Negligência</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição *
                </label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Descreva detalhadamente o ocorrido"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço *
                </label>
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Onde ocorreu o fato?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quando Ocorreu? *
                </label>
                <input
                  type="text"
                  name="quandoOcorreu"
                  value={formData.quandoOcorreu}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Hoje à noite, ontem de manhã, etc."
                />
              </div>

              {!formData.anonima && (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="querAcompanhar"
                    checked={formData.querAcompanhar}
                    onChange={handleChange}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-medium">Desejo acompanhar esta denúncia</span>
                </label>
              )}

              <Button type="submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Registrar Denúncia'}
              </Button>
            </form>
          </CardBody>
        </Card>
      </main>
    </div>
  )
}
