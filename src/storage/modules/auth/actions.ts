import mutations from './mutations'
import {ILoginResponse} from '@/interfaces/IAuth';
import { guaranteeStore, loaderStore, userStorage } from '../../index'
import mutationAuth from './mutations'
import { apiClient } from '@/api-client/axios/config'
import { authRequest } from '@/api-client'
import router from '@/router'
import { ILoadingDots } from '@/interfaces/ILoader'

const actions = {
  stateAuth(auth: ILoginResponse): void {
    localStorage.setItem('auth', JSON.stringify(auth))
    mutations.setStateAuth(auth)
  },
  async init(): Promise<void> {
    const auth = localStorage.getItem('auth')
    console.log(auth)
    const profile = localStorage.getItem('profile')
    if (profile) {
      userStorage.mutations.setStateProfile(JSON.parse(profile))
    }
    if (auth) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(auth).token}`
      mutations.setStateAuth(JSON.parse(auth))
      mutationAuth.setIsLogged(true)
      await userStorage.actions.getProfile()
      // await guaranteeStore.actions.getGuarantees()
    }
  },
  async logOut(): Promise<void> {
    const stateDots: ILoadingDots = {
      spinnerDots: true
    }
    loaderStore.actions.loadingOverlay(stateDots).present()
    const { data, success } = await authRequest.logOut()
    const stateAuth: ILoginResponse = {
      redirect_to: '',
      token: '',
      user_id: '',
      tl_token: 0,
      isLoggedIn: false
    }
    if (success) {
      apiClient.defaults.headers.common['Authorization'] = ''
      mutationAuth.setIsLogged(false)
      mutations.setStateAuth(stateAuth)
      localStorage.clear()
      loaderStore.actions.loadingOverlay().dismiss()
      await router.push({
        name: 'Login'
      })
    }
    loaderStore.actions.loadingOverlay().dismiss()
  }
}

export default actions
