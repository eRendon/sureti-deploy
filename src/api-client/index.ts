import Auth from './request/auth'
import File from "./request/file";
import User from './request/user'
import Guarantee from './request/guarantee'
import Loan from './request/loan'
import Payments from './request/payments'
import Transaction from './request/transaction'

export const authRequest = new Auth()
export const fileRequest = new File()
export const userRequest = new User()
export const guaranteeRequest = new Guarantee()
export const loanRequest = new Loan()
export const paymentsRequest = new Payments()
export const transactionRequest = new Transaction()