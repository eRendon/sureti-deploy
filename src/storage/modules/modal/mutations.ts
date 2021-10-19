import { IAlert, IProposalModal, IRequestModal } from '@/interfaces/IAlert'
import state from './state'
import { IPaymentModal } from '@/interfaces/IPayment'

const mutations = {
  setStateAlert(alertData: IAlert): void {
    state.alert = alertData
  },
  setStateProfileModal (stateModal: boolean): void {
    state.showProfileModal = stateModal
  },
  setStateProposalModal (proposalModal: IProposalModal): void {
    state.proposalModal = proposalModal
  },
  setStateRequestModal (requestModal: IRequestModal): void {
    state.requestModal = requestModal
  },
  setStatePaymentsModal (paymentModal: IPaymentModal): void {
    state.payments = paymentModal
  },
  setStateNewGuarantee (isNewGuarantee: boolean): void {
    state.showNewGuarantee = isNewGuarantee
  }
}

export default mutations
