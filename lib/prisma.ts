import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

declare global {
  var prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
  let client: PrismaClient

  if (process.env.DATABASE_URL) {
    // Adicionar parâmetros de pooling para maior estabilidade na Vercel
    const connectionString = process.env.DATABASE_URL.includes('?') 
      ? process.env.DATABASE_URL 
      : `${process.env.DATABASE_URL}?pgbouncer=true&connection_limit=10`
      
    const pool = new Pool({ 
      connectionString,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    })
    
    const adapter = new PrismaPg(pool)
    client = new PrismaClient({ 
      adapter,
      log: ['error']
    })
  } else {
    client = new PrismaClient()
  }

  return client
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
