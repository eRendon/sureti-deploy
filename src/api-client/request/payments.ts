import { AxiosService } from '../axios'
import { IPayment, IPaymentRequest } from '@/interfaces/IPayment'
import { ISurePromise } from '@/interfaces/ISurePromise'

export default class Payments {
  async createPayment (payment: IPayment): Promise<ISurePromise<IPaymentRequest>> {
    const axiosService: AxiosService<IPaymentRequest, IPayment> = new AxiosService()
    try {
      return await axiosService.postData(payment, '/user/payment')
    } catch (e) {
      throw e
    } finally {

    }
  }

  async payments (payment?: IPayment): Promise<ISurePromise<any>> {
    const axiosService = new AxiosService()
    try {
      return await axiosService.getData(payment, '/user/payments')
    } catch (e) {
      throw e
    } finally {

    }
  }
}
