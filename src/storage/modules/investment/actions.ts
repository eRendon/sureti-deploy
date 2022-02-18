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
    },
    async getGuaranteesInInvestments (): Promise<void> {
        const { data, success } = await investmentRequest.getGuaranteesInInvestments()
        if (success) {
            investmentStore.mutations.setGuarantees(data)
        }
    }
}

export default actions
