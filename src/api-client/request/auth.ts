import { ISurePromise } from '@/interfaces/ISurePromise'
import { AxiosService } from '../axios'
import {
  ILogin,
  ILoginResponse,
  IRegister,
  IRegisterRequest,
  IResetCode,
  IResetToken, IResponseResetToken,
  ISchema
} from '@/interfaces/IAuth'
import { ILoadingDots } from '@/interfaces/ILoader'
import { loaderStore } from '@/storage'

export default class Auth {

  public async logIn (loginForm: ILogin): Promise<ISurePromise<ILoginResponse>> {
    const axiosService = new AxiosService<ILoginResponse, ILogin>()
    // const stateDots: ILoadingDots = {
    //   spinnerDots: true
    // }
    // loaderStore.actions.loadingOverlay(stateDots).present()
    try {
      return await axiosService.postData(loginForm, '/auth/login/user')
    } catch (e) {
      throw e
    } finally {
      // loaderStore.actions.loadingOverlay(stateDots).dismiss()
    }
  }

  public async register (formRegister: IRegister): Promise<ISurePromise<IRegisterRequest>> {
    const axiosService = new AxiosService<IRegisterRequest, IRegister>()
    return await axiosService.postData(formRegister, '/auth/signup/user')
  }

  public async verifyCode (activation_code: ISchema): Promise<ISurePromise<string>> {
    const axiosService = new AxiosService<string, ISchema>()
    return await axiosService.postData(activation_code, '/auth/signup/user/activate')
  }

  public async getVerifyCode (): Promise<ISurePromise<string>> {
    const axiosService = new AxiosService<string, null>()
    return await axiosService.getData(null, '/auth/signup/user/activate')
  }

  public async generateCode (reset_code: IResetCode): Promise<ISurePromise<any>> {
    console.log(reset_code)
    const axiosService = new AxiosService<string, null>()
    return await axiosService.getData( null,`/auth/user/reset_code/${reset_code.user}`)
  }

  public async resetToken (resetForm: IResetToken): Promise<ISurePromise<IResponseResetToken>> {
    const axiosService = new AxiosService<IResponseResetToken, IResetToken>()
    return await axiosService.postData(resetForm, '/auth/user/reset_token')
  }

  public async resetPassword (password: string): Promise<ISurePromise<any>> {
    const axiosService = new AxiosService()
    return await axiosService.putData({password}, '/auth/user/credentials')
  }

  public async logOut () {
    const axiosService = new AxiosService()
    try {
      return axiosService.postData(null, '/auth/logout/user')
    } catch (e) {
      throw e
    } finally {

    }
  }

  public async operation (): Promise<ISurePromise<any>> {
    const axiosService = new AxiosService()
    try {
      return axiosService.getData(null, '/auth/user/operation')
    } catch (e) {
      throw e
    } finally {

    }
  }
}
