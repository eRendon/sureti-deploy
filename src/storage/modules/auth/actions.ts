import mutations from './mutations'
import {ILoginResponse} from '@/interfaces/IAuth';
import { loaderStore, userStorage } from '../../index'
import mutationAuth from './mutations'
import { apiClient } from '@/api-client/axios/config'
import { authRequest } from '@/api-client'
import router from '@/router'
import { ILoadingDots } from '@/interfaces/ILoader'

/**
 * ToDo Actions Module Auth
 */

const actions = {

  /**
   * @param auth
   * @type ILoginResponse
   * @return void
   * Set the auth state and localStore to persist data
   */

  stateAuth(auth: ILoginResponse): void {
    localStorage.setItem('auth', JSON.stringify(auth))
    mutations.setStateAuth(auth)
  },

  /**
   ToDo Init Data Sureti
   * When refresh page. This get the state browser (name tab navigation), auth user and get profile user and set authorization
   * bearer token to headers axios
   * @return void
   */
  async init(): Promise<void> {
    const stateBrowser = localStorage.getItem('stateBrowser')
    if(stateBrowser) {
      userStorage.mutations.setStateBrowser(stateBrowser)
    }
    const auth = localStorage.getItem('auth')
    console.log(auth)
    if (auth) {
      mutationAuth.setIsLogged(true)
      const profile = localStorage.getItem('profile')
      if (profile) {
        userStorage.mutations.setStateProfile(JSON.parse(profile))
      }
      const loadingState = loaderStore.getters.getOverlayModal()
      if (!loadingState.spinnerDots) {
        const stateDots: ILoadingDots = {
          spinnerDots: true
        }
        loaderStore.actions.loadingOverlay(stateDots).present()
      }
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(auth).token}`
      mutations.setStateAuth(JSON.parse(auth))
      await userStorage.actions.getProfile()
      // await guaranteeStore.actions.getGuarantees()
    }
  },

  /**
   ToDo LogOut user
   * log out function user, and clear all data in localStore
   * @return Promise<void>
   */

  async logOut(): Promise<void> {
    const stateDots: ILoadingDots = {
      spinnerDots: true
    }
    loaderStore.actions.loadingOverlay(stateDots).present()
    const { success } = await authRequest.logOut()
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
