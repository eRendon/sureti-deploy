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
    guarantees: IGuaranteeInInvestment[]
    selectedGuarantee: IGuaranteeInInvestment
}

export interface IGuaranteeInInvestment {
    guarantee_id?: string
    guarantee_value?: string
    state?: string
    label?: string // SI NO TIENE, RESPONDER CON STRING VACIO
    balance?: string // VIENE DEL LOAN
    real_estate_city?: string
    real_estate_province?: string // SI NO TIENE, RESPONDER CON STRING VACIO
    real_estate_estrato?: string
    real_estate_type?: string // SI NO TIENE, RESPONDER CON STRING VACIO
    real_estate_area?: string
    return_investment?: string
    investments?: IInvestment[]
    last_interest_payment?: ILastInterestPayment // ES UN FINANCIAL TRANSACTION CON transaction_type =='investment_interest_transaction,
    last_capital_payment?: ILastCapitalPayment // ES UN FINANCIAL TRANSACTION CON transaction_type=='capital_payment_transaction',
}

export interface ILastCapitalPayment {
  state: string
  amount: string
  investment_id: string
  payment_id: string
  proof_date: string
  creation_date_utc: string
}

export interface ILastInterestPayment {
    state: string
    amount: string
    investment_id: string
    payment_id: string
    proof_date: string
    creation_date_utc: string
}

export interface IIndicator {
    head: string
    body: string
    footer?: string
    class?: string
}