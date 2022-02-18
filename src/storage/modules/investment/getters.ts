import state from '@/storage/modules/investment/state'
import { IGuaranteeInInvestment, IInvestment } from '@/interfaces/IInvestment'


const getters = {
    getInvestments: (): IInvestment[] => state.investments,
    getGuarantees: (): IGuaranteeInInvestment[] => state.guarantees,
    getSelectedGuarantee: (): IGuaranteeInInvestment => state.selectedGuarantee
}

export default getters
