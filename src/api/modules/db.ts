import { PrismaClient } from '@prisma/client'

// Instancia a conexão com o banco de dados.
const prisma = new PrismaClient()

export { prisma }
