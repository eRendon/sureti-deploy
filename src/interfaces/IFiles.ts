export interface IUserDocument {
  user_id?: string
  file_name?: string
  file?: File
  doc_type?: string
  description?: string
}

export interface IDocument {
  creation_date: string
  creation_date_utc: string
  description: string
  doc_id: string
  doc_type: string
  document_id: string
  name: string
  state: string
  storage_path: string
  system_type: string
  user_id: string
}

export interface IGuaranteeDocument extends IUserDocument {
  guarantee_id?: string
}


export interface IPaymentDocument extends IUserDocument {
  payment_id: string
}

export interface IFilterDocument {
  document_id?: string
  guarantee_id?: string
  readonly user_id?: string
  doc_type?: string
  loan_id?: string
  payment_id?: string
  transaction_id?: string
  system_type?: string
  date_field?: string
  lower_date?: string
  higher_date?: string
}