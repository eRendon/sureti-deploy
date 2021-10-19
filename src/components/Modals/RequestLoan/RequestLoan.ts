import { computed, defineComponent, ref, watch } from 'vue'
import { guaranteeStore, loansStore, modalStore, userStorage } from '@/storage'
import { IRequest } from '@/interfaces/IRequest'
import { loanRequest } from '@/api-client'
import { useRoute } from 'vue-router'
import { IAlert } from '@/interfaces/IAlert'
import GuaranteeList from '@/components/List/Guarantee/Guarantee.vue'

export default defineComponent({
    name: 'RequestLoan',
    components: {
        GuaranteeList
    },
    setup () {
        const stateModal = computed(() => modalStore.getters.getStateRequestModal())
        const requestLoan = ref<IRequest>({
            amount: 0
        })

        const activeLoan = computed(() => loansStore.getters.getActiveLoan())

        const errorValue = computed(() => !(requestLoan.value.amount! > 0 && requestLoan.value.amount! <= (Number(guarantee.value.guarantee_credit_limit!) - Number(activeLoan.value.balance))))

        const guarantee = computed(() => guaranteeStore.getters.getSelectedGuarantee())

        watch(() => guarantee.value, () => {
            loansStore.actions.filterLoan(guarantee.value.guarantee_id!)
        })

        const route = useRoute()

        const dismissModal = (): void => {
            modalStore.actions.requestModal({}, false)
        }

        const createRequest = async () => {
            if (!errorValue.value) {
                const { user_id } = userStorage.getters.getStateProfile()
                requestLoan.value.user_id = user_id
                requestLoan.value.guarantee_id = route.params.id as string || guarantee.value.guarantee_id!
                const { data, success, status } = await loanRequest.createRequest(requestLoan.value)
                console.log('create loan', data)
                if (status === 409) {
                    const alert: IAlert = {
                        show: true,
                        text: data
                    }
                    modalStore.actions.alert(alert).present()
                    return
                }
                if (success) {
                    const alert: IAlert = {
                        show: true,
                        text: 'Se ha enviado la solicitud con éxito'
                    }
                    modalStore.actions.alert(alert).present()
                    loansStore.mutations.setStateActiveRequest(requestLoan.value)
                    // await loansStore.actions.getLoans()
                    // await loansStore.actions.getProposals()
                    await loansStore.actions.getRequest()
                    loansStore.actions.filterLoan(guarantee.value.guarantee_id!)
                    loansStore.actions.filterRequest(guarantee.value.guarantee_id!)
                    dismissModal()
                }
                return
            }
        }
        const onCancelSelected = (): void => {
            requestLoan.value.amount = 0
            guaranteeStore.mutations.setSelectedGuarantee({})
        }

        return {
            createRequest,
            dismissModal,
            onCancelSelected,
            errorValue,
            guarantee,
            requestLoan,
            stateModal,
            activeLoan
        }
    }
})
