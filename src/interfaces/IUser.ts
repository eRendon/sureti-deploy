export interface IUser {
  cell_phone: string
  email: string
  first_name: string
  last_name: string
  mfa_email: boolean
  mfa_phone: boolean
  middle_name: string
}

export interface IInformation {
  // address?: string
  // birth_date?: string
  // birth_place?: string
  // city?: string
  // contact_cell_phone?: string
  // country?: string
  // credit_score?: string
  first_name?: string
  gender?: string
  identification_expedition_date?: string
  identification_expedition_place?: string
  identification_number?: string
  identification_type?: string
  last_name?: string
  middle_name?: string
}

export interface UserId {
  user_id?: string
}

export interface ISensitiveInformation {
  bank_account_information?: IBankAccountInformation[]
  cell_phone?: string
  email?: string
  mfa_email?: true
  mfa_phone?: true
  password?: string
  temporal_code?: string
}

export interface IBankAccountInformation {
  bank?: string
  bank_account_holder?: string
  bank_account_holder_identification?: string
  bank_account_holder_identification_type?: string
  bank_account_number?: string
  bank_account_type?: string
}

export interface IProfile extends IInformation, UserId{
  accept_terms?: true
  bank_account_information?: IBankAccountInformation[]
  cell_phone?: string
  creation_date?: string
  email?: string
  email_verified?: true
  investment_credit_limit?: string
  last_access_date?: string
  mfa_email?: true
  mfa_phone?: true
  state?: string
  total_capital_payments?: number
  total_guarantees_credit_limit?: number
  total_guarantees_value?: number
  total_interest_payments?: number
  total_investment_interests?: number
  total_investments?: number
  total_loans?: number
  total_loans_interest?: number
  total_received_capital_payments?: number
  total_received_interest_payments?: number
  user_type?: string
  password?: string,
  temporal_code? :string
}

export interface IUserStore {
  profile?: IProfile
  isBrowsing: string
  toGetMovements: boolean
}
