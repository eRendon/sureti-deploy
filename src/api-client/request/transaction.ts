import { ITransaction } from '@/interfaces/ITransaction'
import { AxiosService } from '../axios'
import { ISurePromise } from '@/interfaces/ISurePromise'

export default class Transaction {
  async financialTransactions(filter?: ITransaction): Promise<ISurePromise<ITransaction[]>> {
    const axiosService: AxiosService<ITransaction[], ITransaction> = new AxiosService()
    try {
      return await axiosService.getData(filter!, 'user/financial_transactions')
    } catch (e) {
      throw e
    } finally {

    }
  }

  async transactions(filter?: ITransaction): Promise<ISurePromise<ITransaction[]>> {
    const axiosService: AxiosService<ITransaction[], ITransaction> = new AxiosService()
    try {
      return await axiosService.getData(filter!, '/user/transactions')
    } catch (e) {
      throw e
    } finally {

    }
  }
}
