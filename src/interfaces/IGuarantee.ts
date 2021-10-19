import { IDocumentFile, IOwner } from '@/interfaces/IOwner'
import { ILoan } from '@/interfaces/ILoans'

export interface IGuarantee {
  guarantee_type?: string
  user_id?: string
  guarantee_value?: number
  real_estate_area?: number
  real_estate_property_taxes?: number
  real_estate_property_taxes_paid?: number
  guarantee_sub_type?: string
  real_estate_chip?: string
  property_real_estate_id?: string
  real_estate_city?: string
  real_estate_country?: string
  real_estate_estrato?: string
  real_estate_address?: string
  score?: string
  cdt_issuing_entity?: string
  cdt_number?: string
  cdt_title_number?: string
  cdt_constitution_date?: string
  cdt_expiration_date?: string
  ready_for_loan_date?: string
  real_estate_property_taxes_pay_date?: string
  description?: string
  guarantee_id?: string
  owners?: IOwner[],
  propertyTax?: IDocumentFile
  freedomAndTradition?: IDocumentFile
  photo?: IDocumentFile
  state?: string
  commission?: number
  creation_date?: string
  creation_date_utc?: string
  daily_interest?: string
  debt_status?: number
  doc_id?: string
  financial_fees?: number
  guarantee_credit_limit?: number
  last_daily_interest?: number
  return_investment?: number
  loan?: ILoan
}

export interface IResponseGuarantee {
  guarantee_id: string
}

export interface IGuaranteeStorage {
  guarantees: IGuarantee[]
  selectedGuarantee?: IGuarantee
}
