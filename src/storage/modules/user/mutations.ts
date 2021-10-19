import state from './state'
import { IProfile } from '@/interfaces/IUser'

const mutations = {
  setStateProfile(profile: IProfile): void {
    localStorage.setItem('profile', JSON.stringify(profile))
    state.profile = profile
  },
  setStateBrowser (stateBrowser: string): void {
    state.isBrowsing = stateBrowser
  },
}

export default mutations
