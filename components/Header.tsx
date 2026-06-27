'use client'

import React from 'react'
import Link from 'next/link'

interface HeaderProps {
  title: string
  showNav?: boolean
}

export function Header({ title, showNav = true }: HeaderProps) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Vizinhos JF
          </Link>
          {showNav && (
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Início
              </Link>
              <Link href="/solicitacoes" className="text-gray-700 hover:text-blue-600">
                Solicitações
              </Link>
              <Link href="/obras" className="text-gray-700 hover:text-blue-600">
                Obras
              </Link>
              <Link href="/denuncias" className="text-gray-700 hover:text-blue-600">
                Denúncias
              </Link>
              <Link href="/comunicados" className="text-gray-700 hover:text-blue-600">
                Comunicados
              </Link>
              <Link href="/guia" className="text-gray-700 hover:text-blue-600">
                Guia
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}
