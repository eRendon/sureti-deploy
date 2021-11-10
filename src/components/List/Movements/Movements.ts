import { computed, defineComponent, onMounted, ref, provide, watch } from 'vue'
import { paymentsRequest, transactionRequest } from '@/api-client'
import { ITransaction } from '@/interfaces/ITransaction'
import { IPayment } from '@/interfaces/IPayment'
import { loaderStore, userStorage } from '@/storage'
import { ILoadingDots } from '@/interfaces/ILoader'

interface IMovements extends ITransaction, IPayment {
}

export default defineComponent({
    name: 'Movements',
    setup () {

        const movementFilter = ref<ITransaction & IPayment>({})
        const paymentsFilter = ref<IPayment>({})
        const isPayments = ref(true)
        const profile = computed(() => userStorage.getters.getStateProfile())
        const isDetailMovement = ref(-1)
        const movementsPayments = ref<IMovements[]>([])
        const movementsTransfer = ref<IMovements[]>([])
        const showFilter = ref(false)

        const stateToMovements = computed(() => userStorage.getters.getStateToGetMovements())

        watch(()=> stateToMovements.value, (nextState, previewState) => {
            console.log(previewState)
            console.log(nextState)
            if (nextState) {
                getMovements()
            }
        })

        const getMovements = async (): Promise<void> => {
            const stateDots: ILoadingDots = {
                spinnerDots: true
            }
            loaderStore.actions.loadingOverlay(stateDots).present()
            movementFilter.value.user_id = profile.value.user_id
            paymentsFilter.value.user_id = profile.value.user_id
            const {
                data: financialTransactions,
                success: successFinancial
            } = await transactionRequest.financialTransactions(movementFilter.value)
            if (successFinancial) {
                movementsTransfer.value?.push(...financialTransactions.filter((transaction) => {
                    if (transaction.transaction_type === 'loan_disbursement') {
                        return transaction
                    }
                }))
            }
            const {
                data: transactions,
                success: successTransactions
            } = await transactionRequest.transactions(movementFilter.value)
            if (successTransactions) {
                movementsTransfer.value?.push(...transactions.filter((transaction) => {
                    if (transaction.transaction_type !== 'create_guarantee_request' && transaction.transaction_type !== 'payment request') {
                        return transaction
                    }
                }))
            }

            const { data: payments, success: successPayments } = await paymentsRequest.payments(paymentsFilter.value)
            if (successPayments) {
                movementsPayments.value?.push(...payments)
            }

            loaderStore.actions.loadingOverlay().dismiss()
            console.log('financialTransactions', financialTransactions)
            console.log('transactions', transactions)
            console.log('successPayments', successPayments)
            console.log('payments', payments)
            console.log('movements', movements)
        }

        const movements = computed<IMovements[]>(() => {
            if (isPayments.value) {
                return movementsPayments.value
            }
            return movementsTransfer.value
        })

        onMounted(async () => {
            await getMovements()
        })

        return {
            movements,
            isDetailMovement,
            showFilter,
            isPayments
        }
    }
})
