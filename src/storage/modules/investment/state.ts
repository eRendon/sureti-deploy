import { reactive } from 'vue'
import { IInvestmentStore } from '@/interfaces/IInvestment'

const state = reactive<IInvestmentStore>({
    investments: []
})

export default state
