import { reactive } from 'vue'
import { IInvestmentStore } from '@/interfaces/IInvestment'

const state = reactive<IInvestmentStore>({
    investments: [],
    guarantees: [],
    selectedGuarantee: {}
})

export default state
