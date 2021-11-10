import { IGuarantee, IResponseGuarantee } from '@/interfaces/IGuarantee'
import { AxiosService } from '../axios'
import { loaderStore, userStorage } from '../../storage'
import { ISurePromise } from '@/interfaces/ISurePromise'
import { ILoadingDots } from '@/interfaces/ILoader'

export default class Guarantee {
  async create (guarantee: IGuarantee): Promise<ISurePromise<IResponseGuarantee>>  {
    const axiosService = new AxiosService<IResponseGuarantee, IGuarantee>()
    try {
      return await axiosService.postData(guarantee, '/user/guarantee')
    } catch (e) {
      throw e
    } finally {

    }
  }

  async update (guarantee_id: string, guarantee: IGuarantee) {
    const stateDots: ILoadingDots = {
      spinnerDots: true
    }
    loaderStore.actions.loadingOverlay(stateDots).present()
    const axiosService = new AxiosService()
    try {
      return await axiosService.putData(guarantee, `/user/guarantee/${guarantee_id}`)
    } catch (e) {
      throw e
    } finally {
      loaderStore.actions.loadingOverlay().dismiss()
    }
  }

  async unsubscribe (guarantee_id: string) {
    const axiosService = new AxiosService()

    const { user_id } = userStorage.getters.getStateProfile()

    const guarantee = {
      guarantee_id,
      user_id
    }

    try {
      return await axiosService.postData(guarantee, '/user/guarantee/unsubscribe')
    } catch (e) {

    } finally {

    }
  }

  async get (): Promise<ISurePromise<IGuarantee[]>> {
    const axiosService = new AxiosService<IGuarantee[], null>()
    const { user_id } = userStorage.getters.getStateProfile()
    try {
      return axiosService.getData(null, `/user/guarantees/${user_id}`)
    } catch (e) {
      throw e
    } finally {
    }
  }
}
