import { computed, defineComponent, ref } from 'vue'
import { loansStore, modalStore, userStorage } from '@/storage'
import { loanRequest } from '@/api-client'
import { IUpdateProposal } from '@/interfaces/IProposal'
import { IAlert } from '@/interfaces/IAlert'

export default defineComponent({
    name: 'ProposalModal',
    setup() {
        const stateProposal = computed(() => modalStore.getters.getStateProposalModal())
        const profile = computed(() => userStorage.getters.getStateProfile())
        const toUpdate = ref<IUpdateProposal>({
            approve: false
        })

        const dismissModal = (): void => {
            modalStore.actions.proposalModal({}, false)
        }

        const updateProposal = async () => {
            toUpdate.value.user_id = profile.value.user_id
            console.log(toUpdate)
            const { data, success } = await loanRequest.updateProposal(stateProposal.value.proposal.transaction_id!, toUpdate.value)
            console.log(data)
            if (success) {
                const alert: IAlert = {
                    text: 'la información de la propuesta ha sido enviada',
                    show: true,
                }
                modalStore.actions.alert(alert).present()
                await loansStore.actions.getLoans()
                await loansStore.actions.getRequest()
                await loansStore.actions.getProposals()
                loansStore.actions.filterLoan(stateProposal.value.proposal.guarantee_id!)
                loansStore.actions.filterProposal(stateProposal.value.proposal.guarantee_id!)
                dismissModal()
            }
        }

        return {
            toUpdate,
            updateProposal,
            dismissModal,
            stateProposal
        }
    }
})