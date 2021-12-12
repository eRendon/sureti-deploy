import { investmentRequest } from '@/api-client'
import { investmentStore, loaderStore } from '@/storage'


const actions = {
    async getInvestments (): Promise<void> {
        const { data, success } = await investmentRequest.investment()
        console.log('getInvestments', data)
        if (success) {
            investmentStore.mutations.setInvestments(data)
        }
        loaderStore.actions.loadingOverlay().dismiss()
    }
}

export default actions
