import mutations from './mutations'
import { IProfile } from '@/interfaces/IUser'
import getters from './getters'
import router from '../../../router'
import { userRequest } from '@/api-client'
import { authStorage, guaranteeStore, loaderStore, modalStore, userTypeStore } from '../../index'
import mutationAuth from '../auth/mutations'
import { IAlert } from '@/interfaces/IAlert'

const actions = {

  stateProfile(profile: IProfile): void {
    mutations.setStateProfile(profile)
  },
  async validateUserType(): Promise<void> {
    const profile = getters.getStateProfile()
    mutationAuth.setIsLogged(true)
    if (!profile.user_type) {
      await router.push({
        name: 'OnBoarding'
      })
      loaderStore.actions.loadingOverlay().dismiss()
      return
    }
    await guaranteeStore.actions.getGuarantees()
    profile.user_type === 'client' ? await userTypeStore.actions.loadFlowClient() : userTypeStore.actions.loadFlowInvestment()
    if (router.options.history.state.back === '/login' || router.currentRoute.value.name === 'Login') {
      await router.push({
        name: 'Dashboard'
      })
      loaderStore.actions.loadingOverlay().dismiss()
    }
  },
  async getProfile(): Promise<void> {
    const { user_id } = authStorage.getters.getStateAuth()
    const { success, data, status } = await userRequest.getProfile(user_id!)
    if (status === 404) {
      const alert: IAlert = {
        text: 'Su sesión ha caducado',
        show: true
      }
      modalStore.actions.alert(alert)
      await authStorage.actions.logOut()
      return
    }
    if (success) {
      mutations.setStateProfile(data)
      await this.validateUserType()
    }
  }
}

export default actions
