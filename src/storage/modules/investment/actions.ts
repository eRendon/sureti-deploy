import { investmentRequest } from '@/api-client'
import { guaranteeStore } from '@/storage'


const actions = {
    async getInvestments (): Promise<void> {
        const { data, success } = await investmentRequest.investment()
        console.log('getInvestments', data)
        if (success) {
            guaranteeStore.mutations.setStateGuarantees(data)
        }
    }
}

export default actions
