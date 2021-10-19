import state from './state'
import { IIndicator } from '@/interfaces/IIndicator'

const getters = {
  getIndicators: (): IIndicator[] => state.indicators,
  getIsClient: (): boolean => state.isClient,
  getIsInvestor: (): boolean => state.isInvestor
}

export default getters
