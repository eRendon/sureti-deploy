import state from './state'
import { ITypeUserStore } from '@/interfaces/ITypeUser'

const mutations = {
  setStateUserType(userType: ITypeUserStore): void {
    const { indicators, isClient, isInvestor } = userType
    state.indicators = indicators
    state.isClient = isClient
    state.isInvestor = isInvestor
  }
}

export default mutations
