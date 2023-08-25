/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/src/singleton.ts'] // define as configurações de mock para o Prisma
}
