import state from './state'
import {ILoginResponse} from '@/interfaces/IAuth';

const mutations = {
  setStateAuth(auth: ILoginResponse): void {
    state.auth = auth
  },
  setIsLogged(isLoggedIn: boolean): void {
    state.auth.isLoggedIn = isLoggedIn
  }
}

export default mutations
