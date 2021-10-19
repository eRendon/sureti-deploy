import { guaranteeStore, loansStore, modalStore, userStorage } from '../../index'
import { IIndicator } from '@/interfaces/IIndicator'
import { ITypeUserStore } from '@/interfaces/ITypeUser'
import mutations from './mutations'
import { loanRequest } from '@/api-client'
import { IPaymentModal } from '@/interfaces/IPayment'

const actions = {
  async loadFlowClient () {
    const { total_loans, total_loans_interest, total_interest_payments, total_capital_payments, total_guarantees_credit_limit } = userStorage.getters.getStateProfile()
    this.indicatorsClient(total_loans!, total_loans_interest!, total_interest_payments!, total_capital_payments!, total_guarantees_credit_limit!)
    await loansStore.actions.getLoans()
    await loansStore.actions.getProposals()
    await loansStore.actions.getRequest()
    loansStore.mutations.setStateToFilter(true)
    // await guaranteeStore.actions.getGuarantees()
  },

  loadFlowInvestment () {
    const { total_investments, total_investment_interests, total_received_interest_payments, total_received_capital_payments } = userStorage.getters.getStateProfile()
    this.indicatorsInvestment(Number(total_investments),Number(total_investment_interests), Number(total_received_interest_payments), Number(total_received_capital_payments) )
  },

  indicatorsClient(total_loans: number, total_loans_interest: number, total_interest_payments: number, total_capital_payments: number, total_guarantees_credit_limit: number) {
    const indicatorLoan: IIndicator = {
      title: 'Intereses Pendientes',
      nameLink: 'Realizar un pago',
      amount: total_loans_interest - total_interest_payments,
      nameComponent: 'Payments',
      action: (): void => {
        if (total_loans_interest - total_interest_payments > 0) {
          const paymentState: IPaymentModal = {
            show: true,
            isCapitalPayment: false,
            title: 'Pago de intereses'
          }
          modalStore.actions.paymentModal(paymentState)
        }
      }
    }
    const indicatorCapital: IIndicator = {
      title: 'Capital en deuda',
      nameLink: 'Abono a capital',
      amount: total_loans - total_capital_payments,
      nameComponent: 'Payments',
      action: (): void => {
        if (total_loans - total_capital_payments > 0) {
          const paymentState: IPaymentModal = {
            show: true,
            isCapitalPayment: true,
            title: 'Abono a capital'
          }
          modalStore.actions.paymentModal(paymentState)
        }
      }
    }
    const indicatorQuota: IIndicator = {
      title: 'Cupo disponible',
      nameLink: 'Solicitar mas fondos',
      amount: total_guarantees_credit_limit - total_loans,
      nameComponent: 'Payments',
      action: (): void => {
        if (total_guarantees_credit_limit - total_loans > 0) {
          modalStore.actions.requestModal({}, true)
        }
      }
    }
    const indicators: IIndicator[] = []
    indicators.push(indicatorLoan)
    indicators.push(indicatorCapital)
    indicators.push(indicatorQuota)

    const storageData: ITypeUserStore = {
      indicators,
      isClient: true,
      isInvestor: false
    }
    mutations.setStateUserType(storageData)
  },
  indicatorsInvestment(total_investments: number, total_investment_interests: number, total_received_interest_payments: number, total_received_capital_payments: number) {
    const indicatorLoan: IIndicator = {
      title: 'Intereses Pendientes',
      amount: total_investments + total_investment_interests,
    }
    const indicatorCapital: IIndicator = {
      title: 'Intereses Pendientes',
      amount: total_received_interest_payments + total_received_capital_payments,
    }
    const indicatorQuota: IIndicator = {
      title: 'Intereses Pendientes',
      amount: total_investments + total_investment_interests,
    }
    const indicators: IIndicator[] = []
    indicators.push(indicatorLoan)
    indicators.push(indicatorCapital)
    indicators.push(indicatorQuota)

    const storageData: ITypeUserStore = {
      indicators,
      isClient: false,
      isInvestor: true
    }
    mutations.setStateUserType(storageData)
  }
}

export default actions
