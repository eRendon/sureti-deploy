import { AxiosService } from '../axios'
import { CreditLimit, IInvestment } from '@/interfaces/IInvestment'
import { loaderStore, userStorage } from '../../storage'
import { ILoadingDots } from '@/interfaces/ILoader'
import { IGuarantee } from '@/interfaces/IGuarantee'
import { ISurePromise } from '@/interfaces/ISurePromise'

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
    const stateDots: ILoadingDots = {
      spinnerDots: true
    }
    loaderStore.actions.loadingOverlay(stateDots).present()
    const axiosService = new AxiosService()
    try {
      return await axiosService.postData(credit,'/user/investment/credit_limit')
    } catch (e) {
      throw e
    } finally {
      loaderStore.actions.loadingOverlay().dismiss()
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

  async investment (): Promise<ISurePromise<IGuarantee[]>> {
    const stateDots: ILoadingDots = {
      spinnerDots: true
    }
    loaderStore.actions.loadingOverlay(stateDots).present()
    const axiosService: AxiosService<IGuarantee[], null> = new AxiosService()
    const { user_id } = userStorage.getters.getStateProfile()
    try {
      return await axiosService.getData(null, `/user/investment/${user_id}`)
    } catch (e) {
      throw e
    } finally {
      loaderStore.actions.loadingOverlay().dismiss()
    }
  }
}
