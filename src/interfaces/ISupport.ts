import { UserId } from './IUser'

export interface ISupport extends UserId{
  description: string
  support_type: string
  admin_id: string
  close_date: string
  creation_date: string
  solution: 0
  state: string
  support_id: string
  user_id: string
}
