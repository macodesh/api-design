// Estende o tipo Request do Express para incluir o usuário logado
declare namespace Express {
  import { type IUser } from './interfaces'

  export interface Request {
    user?: IUser
  }
}
