import { IAlert, IProposalModal, IRequestModal } from '@/interfaces/IAlert'
import state from './state'
import { IPaymentModal } from '@/interfaces/IPayment'

const getters = {
  getStateAlert: (): IAlert => state.alert,
  getStateProfileModal: (): boolean => state.showProfileModal,
  getStateProposalModal: (): IProposalModal => state.proposalModal,
  getStateRequestModal: (): IRequestModal => state.requestModal,
  getStatePaymentsModal: (): IPaymentModal => state.payments,
  getStateNewGuarantee: (): boolean => state.showNewGuarantee
}

export default getters
