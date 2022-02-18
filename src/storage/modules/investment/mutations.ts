import { IGuaranteeInInvestment, IInvestment } from '@/interfaces/IInvestment'
import state from '@/storage/modules/investment/state'

const mutations = {
    setInvestments (investments: IInvestment[]): void {
        state.investments = investments
    },
    setGuarantees (guarantees: IGuaranteeInInvestment[]): void {
        state.guarantees = guarantees
    },
    setSelectedGuarantee(guarantee: IGuaranteeInInvestment) {
        state.selectedGuarantee = guarantee
    }
}

export default mutations
