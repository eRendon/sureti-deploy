import { AxiosService } from '../axios'
import { CreditLimit, IInvestment } from '../../interfaces/IInvestment'
import { userStorage } from '../../storage'

export default class Investment {
  async cashOut (investment: IInvestment) {
    const axiosService = new AxiosService()
    try {
      return await axiosService.postData(investment, '/user/investment/cash_out')
    } catch (e) {

    } finally {

    }
  }

  async creditLimit (credit: CreditLimit) {
    const axiosService = new AxiosService()
    try {
      return await axiosService.postData(credit,'/user/investment/credit_limit')
    } catch (e) {

    } finally {

    }
  }

  async request (investment: IInvestment) {
    const axiosService = new AxiosService()
    try {
      return await axiosService.postData(investment, '/user/investment/request')
    } catch (e) {
      throw e
    } finally {

    }
  }

  async investment () {
    const axiosService = new AxiosService()
    const { user_id } = userStorage.getters.getStateProfile()
    try {
      return await axiosService.getData(null, `/user/investment/${user_id}`)
    } catch (e) {
      throw e
    } finally {

    }
  }
}
