import { type PrismaClient } from '@prisma/client'
import { type DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended'
import prisma from './modules/db'

// Mocka o módulo de banco de dados

jest.mock('./modules/db', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>()
}))

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
