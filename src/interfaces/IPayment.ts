import { UserId } from './IUser'

export interface IPayment extends UserId {
  amount?: number
  loan_id?: string
  pay_out_date?: string
  payment_type?: string
  user_id?: string
  creation_date?: string,
  guarantee_id?: string,
  payment_id?: string,
  state?: string,
  lower_date?: string
}


export interface IPaymentModal {
  show: boolean
  isCapitalPayment?: boolean
  title?: string
}

export interface IPaymentRequest {
  payment_id: string
  payment_request_id: string
}