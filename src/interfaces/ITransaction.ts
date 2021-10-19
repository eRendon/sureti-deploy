export interface ITransaction {
  admin_id?: string,
  amount?: number,
  creation_date?: string,
  guarantee_id?: string,
  interest_id?: string,
  investment_id?: string,
  loan_id?: string,
  loan_request_id?: string,
  pay_out_date?: string,
  payment_id?: string,
  state?: string,
  transaction_id?: string,
  transaction_type?: string,
  user_id?: string
  lower_date? :string
  date_field?: string
}
