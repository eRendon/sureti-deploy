import state from './state'
import {ILoginResponse} from '@/interfaces/IAuth';
import { userStorage } from '@/storage'

const getters = {
  getStateAuth: (): ILoginResponse => state.auth,
  getStateIsNewUser: (): boolean => !userStorage.getters.getStateProfile().user_type
}

export default getters
