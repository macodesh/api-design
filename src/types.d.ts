// Declaração do namespace 'Express'.
declare namespace Express {
  import { type IUser } from './interfaces'

  // Adiciona uma nova propriedade 'user' à interface 'Request'.
  export interface Request {
    user?: IUser // Propriedade opcional 'user' do tipo IUser.
  }
}
