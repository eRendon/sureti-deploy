import state from '@/storage/modules/investment/state'
import { IInvestment } from '@/interfaces/IInvestment'


const getters = {
    getInvestments: (): IInvestment[] => state.investments
}

export default getters
