import { UserId } from './IUser'

export interface IInvestment extends UserId {
  description: string,
  admin_id?: string
  amount?: string
  balance?: string
  creation_date?: string
  creation_date_utc?: string
  doc_id?: string
  guarantee_id?: string
  investment_id?: string
  investment_request_id?: string
  loan_proposal_id?: string
  pay_out_date?: string
  return_investment?: string
  state?: string
  total_interests_amount?: string
  total_interests_balance?: string
}

export interface CreditLimit extends UserId {
  amount?: 0,
}

export interface IInvestmentStore {
  investments: IInvestment[]
}