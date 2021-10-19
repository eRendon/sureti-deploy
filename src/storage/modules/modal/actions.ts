import { IAction, IAlert } from '@/interfaces/IAlert'
import mutations from './mutations'
import { IProposal } from '@/interfaces/IProposal'
import { IRequest } from '@/interfaces/IRequest'
import { IPaymentModal } from '@/interfaces/IPayment'

const actions = {
  alert(alertData?: IAlert): IAction {
    function present () {
      mutations.setStateAlert(alertData!)
    }

    function dismiss () {
      const dismiss: IAlert = {
        show: false,
        text: ''
      }
      mutations.setStateAlert(dismiss)
    }

    return {
      present,
      dismiss
    }
  },
  proposalModal (proposal: IProposal, show: boolean): void {
    const stateProposal = {
      proposal,
      show
    }
    mutations.setStateProposalModal(stateProposal)
  },
  requestModal (request: IRequest, show: boolean): void {
    const stateRequest = {
      request,
      show
    }
    mutations.setStateRequestModal(stateRequest)
  },
  paymentModal(statePayment: IPaymentModal): void {
    mutations.setStatePaymentsModal(statePayment)
  }
}

export default actions
