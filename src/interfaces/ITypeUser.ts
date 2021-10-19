import { IIndicator } from './IIndicator'

export interface ITypeUser {

}

export interface ITypeUserStore {
    indicators: IIndicator[]
  isClient: boolean
    isInvestor: boolean
}
