import { UserId } from '@/interfaces/IUser'

export interface IProposal {
  admin_id?: string
  amount?: number
  commission?: number
  creation_date?: string
  description?: string
  financial_fees?: number
  guarantee_id?: string
  return_investment?: number
  state?: string
  transaction_id?: string
  transaction_type?: string
  user_id?: string
  creation_date_utc?: string
  doc_id?: string
  loan_id?: string
  loan_request_id?: string
  transaction_ref?: string
}

export interface IUpdateProposal extends UserId{
  approve: boolean
}