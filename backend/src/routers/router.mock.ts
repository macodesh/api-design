export const validationResultMock = jest.fn(() => ({
  isEmpty: jest.fn(() => true),
  array: jest.fn(() => [])
}))

export const user = {
  id: '1',
  username: 'test',
  createdAt: new Date(),
  password: 'test12345',
  products: [
    {
      id: '1',
      createdAt: new Date(),
      name: 'product1',
      userId: '1'
    },
    {
      id: '2',
      createdAt: new Date(),
      name: 'product2',
      userId: '2'
    }
  ]
}
