import { AxiosService } from '../axios'
import { ISupport } from '../../interfaces/ISupport'

export default class Support {
  async create (support: ISupport) {
    const axiosService = new AxiosService()
    try {
      return await axiosService.postData(support, '/user/support')
    } catch (e) {

    } finally {

    }
  }

  async supports (support: ISupport) {
    const axiosService = new AxiosService()
    try {
      return await axiosService.getData(support, '/user/supports')
    } catch (e) {

    } finally {

    }
  }
}
