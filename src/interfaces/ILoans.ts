import { UserId } from '@/interfaces/IUser'
import { IProposal } from '@/interfaces/IProposal'
import { IRequest } from '@/interfaces/IRequest'

export interface ILoan extends UserId {
    amount?: number
    creation_date?: string
    guarantee_id?: string
    state?: string
    transaction_id?: string
    transaction_type?: string
    admin_id?: string
    creation_date_utc?: string
    doc_id?: string
    loan_id?: string
    return_investment?: number
    financial_fees?: number
    commission?: number
    user_id?: string
    pay_out_date?: string
    balance?: number
    total_interests_amount?: number
    total_interests_balance?: number
}



export interface ILoansStore {
    loans?: ILoan[]
    proposals?: IProposal[]
    requests?: IRequest[]
    activeLoan?: ILoan
    createdProposal?: IProposal
    acceptedProposal?: IProposal
    activeRequest?: IRequest
    inactiveRequests?: IRequest[]
    inactiveLoans?: ILoan[]
    inactiveProposals?: IProposal[]
    requestByGuarantee?: IRequest[]
    rejectedRequests?: IRequest[]
    rejectedProposals?: IProposal[]
    isToFilter: boolean
}
