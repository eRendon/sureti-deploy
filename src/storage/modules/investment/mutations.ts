import { IInvestment } from '@/interfaces/IInvestment'
import state from '@/storage/modules/investment/state'

const mutations = {
    setInvestments (investments: IInvestment[]): void {
        state.investments = investments
    }
}

export default mutations
