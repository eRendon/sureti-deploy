import { UserId } from './IUser'

export interface IInvestment extends UserId {
  description: string,
  investment_id: string,
}

export interface CreditLimit extends UserId {
  amount: 0,
}
