declare namespace Express {
  import { type IUser } from './interfaces'

  export interface Request {
    user?: IUser
  }
}
