import { IUser } from './IUser'

export interface IRegister extends IUser{
  password: string
}

export interface IRegisterRequest {
  redirect_to: string
  token: string
}

export interface ILogin {
  password: string
  user: string
}

export interface IAuthStorage {
  auth: ILoginResponse
  isNewUser: boolean
}

export interface ILoginResponse {
  redirect_to?: string
  token?: string
  user_id?: string
  tl_token?: number
  isLoggedIn: boolean
}

export interface IResetCode {
  user: string
}

export interface IResponseResetToken {
  token: string
}


export interface ISchema {
  activation_code: string
}


export interface IResetToken {
  mfa_code?: string
  user?: string
}
