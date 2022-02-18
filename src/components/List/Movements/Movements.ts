import { computed, defineComponent, onMounted, ref, provide, watch } from 'vue'
import { paymentsRequest, transactionRequest } from '@/api-client'
import { ITransaction } from '@/interfaces/ITransaction'
import { IPayment, IPaymentRequest } from '@/interfaces/IPayment'
import { loaderStore, userStorage } from '@/storage'
import { ILoadingDots } from '@/interfaces/ILoader'
import _ from 'lodash'

interface IMovements extends ITransaction, IPayment {
}

export default defineComponent({
    name: 'Movements',
    props: {
      guaranteeId: {
          type: String,
          default: ''
      }
    },
    setup (props) {

        const movementFilter = ref<ITransaction & IPayment>({})
        const paymentsFilter = ref<IPayment>({})
        const isPayments = ref(true)
        const profile = computed(() => userStorage.getters.getStateProfile())
        const isDetailMovement = ref(-1)
        const movementsPayments = ref<IMovements[]>([])
        const movementsTransfer = ref<IMovements[]>([])
        const showFilter = ref(false)
        const trimestral_pay = ref<number>(new Date().getMonth() + 1)
        const year = ref<number>(new Date().getFullYear())
        const stateToMovements = computed(() => userStorage.getters.getStateToGetMovements())

        watch(()=> stateToMovements.value, (nextState, previewState) => {
            console.log(previewState)
            console.log(nextState)
            if (nextState) {
                getMovements()
            }
        })

        const rangeYear = (): number[] => {
            const max = new Date().getFullYear()
            const min = max - 100
            const years = []

            for (let i = max; i >= min; i--) {
                years.push(i)
            }
            return years
        }

        const getMovements = async (): Promise<void> => {
            movementsPayments.value = []
            movementsTransfer.value = []
            const stateDots: ILoadingDots = {
                spinnerDots: true
            }
            loaderStore.actions.loadingOverlay(stateDots).present()
            movementFilter.value.user_id = profile.value.user_id
            if(profile.value.user_type === 'investor') {
                movementFilter.value.guarantee_id = props.guaranteeId
                paymentsFilter.value.guarantee_id = props.guaranteeId
                movementFilter.value.trimestral_pay = `${trimestral_pay.value}-${year.value}`
            }
            paymentsFilter.value.user_id = profile.value.user_id
            const financialTransactionsList = await financialTransactions()
            if (profile.value.user_type === 'investor') {
                validateMovementsUser(financialTransactionsList, [], [])

            } else {
                const transactionsList = await transactions()
                const paymentsList = await payments()
                validateMovementsUser(financialTransactionsList, paymentsList, transactionsList)
            }

            movementsTransfer.value = _.orderBy(movementsTransfer.value, ['creation_date'], ['desc'])
            movementsPayments.value = _.orderBy(movementsPayments.value, ['creation_date'], ['desc'])

            loaderStore.actions.loadingOverlay().dismiss()
        }

        const financialTransactions = async (): Promise<ITransaction[]> => {
            const { data , success } = await transactionRequest.financialTransactions(movementFilter.value)
            if (success) {
                return data
            }
            return []
        }
        const transactions = async (): Promise<ITransaction[]> => {
            const { data, success } = await transactionRequest.transactions(movementFilter.value)
            if (success) {
                return data
            }
            return []
        }

        const payments = async (): Promise<IPaymentRequest[]> => {
            const { data, success } = await paymentsRequest.payments(paymentsFilter.value)
            if (success) {
                return data
            } else {
                return []
            }
        }


        const movementsInvestor = ref<IMovements[]>([])

        const validateMovementsUser = (movements: IMovements[], payments: IMovements[], transactions: IMovements[]) => {
            if (profile.value.user_type?.includes('client')) {
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
                if (movement.transaction_type === 'investment_disbursement' || movement.transaction_type === 'capital_payment_transaction' ||
                    movement.transaction_type === 'interest_payment_transaction') {
                    return movement
                }
            }))
            // movementsInvestor.value.push(...transactions.filter((transaction) => {
            //
            // }))
        }

        const movements = computed<IMovements[]>(() => {
            if (isPayments.value) {
                return movementsPayments.value.length > 0 ? movementsPayments.value.sort((a, b) => {
                    return new Date(b.creation_date!).getTime() - new Date(a.creation_date!).getTime()
                }) : movementsInvestor.value.sort((a, b) => {
                    return new Date(b.creation_date!).getTime() - new Date(a.creation_date!).getTime()
                })
            }
            return movementsTransfer.value.sort((a, b) => {
                return new Date(b.creation_date!).getTime() - new Date(a.creation_date!).getTime()
            })
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
            profile,
            trimestral_pay,
            rangeYear,
            year
        }
    }
})
