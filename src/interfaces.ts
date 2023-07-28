// Interface 'IUser' define a estrutura de um objeto de usuário.
export interface IUser {
  id: string // Propriedade 'id' do usuário, deve ser do tipo 'string'.
  username: string // Propriedade 'username' do usuário, deve ser do tipo 'string'.
}

export interface UserInput {
  username: string
  password: string
}
