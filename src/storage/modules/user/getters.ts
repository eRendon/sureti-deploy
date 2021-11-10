import state from './state'
import { IProfile } from '@/interfaces/IUser'

const getters = {
  getStateProfile: (): IProfile => state.profile!,
  getStateBrowser: (): string => state.isBrowsing,
  getStateToGetMovements: (): boolean => state.toGetMovements
}

export default getters
