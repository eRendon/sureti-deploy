import {ISurePromise} from '@/interfaces/ISurePromise';
import {AxiosService} from "../axios";
import { IInformation, IProfile, ISensitiveInformation } from '@/interfaces/IUser'
import { userStorage } from '../../storage'

export default class User {
  public async getProfile(user_id: string): Promise<ISurePromise<IProfile>> {
    const axiosService = new AxiosService<IProfile, null>()
    return await axiosService.getData(null,`/user/information/${user_id}`)
  }

  async updateInformation(informationUser: IInformation) {
    const axiosService = new AxiosService()
    const { user_id } = userStorage.getters.getStateProfile()
    try {
      return await axiosService.putData(informationUser, `/user/information/${user_id}`)
    } catch (e) {
      throw e
    } finally {

    }
  }

  async updateSensitiveInformation(informationUser: ISensitiveInformation) {
    const axiosService = new AxiosService()
    const { user_id } = userStorage.getters.getStateProfile()
    try {
      return await axiosService.putData(informationUser, `/user/sensitive_information/${user_id}`)
    } catch (e) {
      throw e
    } finally {

    }
  }
}
