import { AxiosService } from '@/api-client/axios'
import { loaderStore, userStorage } from '@/storage'
import { ISurePromise } from '@/interfaces/ISurePromise'
import { ILoan } from '@/interfaces/ILoans'
import { IProposal, IUpdateProposal } from '@/interfaces/IProposal'
import { IRequest } from '@/interfaces/IRequest'

export default class Loan {
  //Propuesta de préstamo
  async updateProposal (transaction_id: string, stateProposal: IUpdateProposal) {
    const axiosService = new AxiosService()
    try {
      return await axiosService.putData(stateProposal, `/user/loan/proposal/${transaction_id}`)
    } catch (e) {
      throw e
    } finally {

    }
  }

  //Solicitud de préstamo
  async createRequest (request: IRequest): Promise<ISurePromise<any>> {
    loaderStore.actions.loadingOverlay( { spinnerDots: true }).present()
    const axiosService = new AxiosService()
    try {
      return await axiosService.postData(request , '/user/loan/request')
    } catch (e) {
      throw e
    } finally {
      loaderStore.actions.loadingOverlay().dismiss()
    }
  }

  async getProposals () {
    const { user_id } = userStorage.getters.getStateProfile()
    const axiosService: AxiosService<IProposal[], null> = new AxiosService()
    try {
      return await axiosService.getData(null, `/user/loan/proposals/${user_id}`)
    } catch (e) {
      throw e
    } finally {

    }
  }

  async requestProposal () {
    const { user_id } = userStorage.getters.getStateProfile()
    const axiosService: AxiosService<IRequest[], null> = new AxiosService()
    try {
      return await axiosService.getData(null, `/user/loan/requests/${user_id}`)
    } catch (e) {
      throw e
    } finally {

    }
  }

  async getProposalInGuarantee () {

  }

  async getLoans (): Promise<ISurePromise<ILoan[]>> {
    const { user_id } = userStorage.getters.getStateProfile()
    const axiosService: AxiosService<ILoan[], null> = new AxiosService()
   try {
     return await axiosService.getData(null, `/user/loans/${user_id}`)
   } catch (e) {
        throw e
   } finally {

   }
  }
}
