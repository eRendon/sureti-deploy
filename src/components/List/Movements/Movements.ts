import { computed, defineComponent, onMounted, ref, provide, watch } from 'vue'
import { paymentsRequest, transactionRequest } from '@/api-client'
import { ITransaction } from '@/interfaces/ITransaction'
import { IPayment } from '@/interfaces/IPayment'
import { loaderStore, userStorage } from '@/storage'
import { ILoadingDots } from '@/interfaces/ILoader'
import _ from 'lodash'

interface IMovements extends ITransaction, IPayment {
}

export default defineComponent({
    name: 'Movements',
    setup () {

        const movementFilter = ref<ITransaction & IPayment>({})
        const paymentsFilter = ref<IPayment>({})
        const isPayments = ref(false)
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
            movementsPayments.value = []
            movementsTransfer.value = []
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
            const {
                data: transactions,
                success: successTransactions
            } = await transactionRequest.transactions(movementFilter.value)
            const { data: payments, success: successPayments } = await paymentsRequest.payments(paymentsFilter.value)
            validateMovementsUser(financialTransactions, payments, transactions)
            // if (successFinancial) {
            //     movementsTransfer.value?.push(...financialTransactions.filter((transaction) => {
            //         if (transaction.transaction_type === 'loan_disbursement') {
            //             return transaction
            //         }
            //     }))
            // }
            // const {
            //     data: transactions,
            //     success: successTransactions
            // } = await transactionRequest.transactions(movementFilter.value)
            // if (successTransactions) {
            //     movementsTransfer.value?.push(...transactions.filter((transaction) => {
            //         if (transaction.transaction_type !== 'create_guarantee_request' && transaction.transaction_type !== 'payment request') {
            //             return transaction
            //         }
            //     }))
            // }

            // const { data: payments, success: successPayments } = await paymentsRequest.payments(paymentsFilter.value)
            // if (successPayments) {
            //     movementsPayments.value?.push(...payments)
            // }

            movementsTransfer.value = _.orderBy(movementsTransfer.value, ['creation_date'], ['desc'])
            movementsPayments.value = _.orderBy(movementsPayments.value, ['creation_date'], ['desc'])

            loaderStore.actions.loadingOverlay().dismiss()
        }

        const movementsInvestor = ref<IMovements[]>([])

        const validateMovementsUser = (movements: IMovements[], payments: IMovements[], transactions: IMovements[]) => {
            if (profile.value.user_type === 'client') {
                movementsTransfer.value?.push(...movements.filter((transaction) => {
                    if (transaction.transaction_type === 'loan_disbursement') {
                        return transaction
                    }
                }))
                movementsTransfer.value?.push(...transactions.filter((transaction) => {
                    if (transaction.transaction_type !== 'create_guarantee_request' && transaction.transaction_type !== 'payment request') {
                        return transaction
                    }
                }))
                movementsPayments.value?.push(...payments)
                return
            }
            movementsInvestor.value.push(...movements.filter((movement) => {
                if (movement.transaction_type === 'investment_disbursement' || movement.transaction_type === 'investment_cash_out_disbursement' ||
                movement.transaction_type === 'capital_payment_transaction' || movement.transaction_type === 'interest_payment_transaction' || movement.transaction_type === 'investment_interest_cash_out_transaction') {
                    return movement
                }
            }))
            // movementsInvestor.value.push(...transactions.filter((transaction) => {
            //
            // }))
        }

        const movements = computed<IMovements[]>(() => {
            if (!isPayments.value) {
                return movementsPayments.value.length > 0 ? movementsPayments.value : movementsInvestor.value
            }
            return movementsTransfer.value
        })

        onMounted(async () => {
            await getMovements()
        })

        return {
            movements,
            movementsInvestor,
            isDetailMovement,
            showFilter,
            isPayments,
            profile
        }
    }
})
