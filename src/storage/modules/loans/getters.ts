import { ILoan } from '@/interfaces/ILoans'
import state from './state'
import { IProposal } from '@/interfaces/IProposal'
import { IRequest } from '@/interfaces/IRequest'

export default {
  getLoans: (): ILoan[] => state.loans!,
  getActiveLoan: (): ILoan => state.activeLoan!,
  getProposals: (): IProposal[] => state.proposals!,
  getRequests:(): IRequest[] => state.requests!,
  getActiveRequest: (): IRequest => state.activeRequest!,
  getCreatedProposal: (): IProposal => state.createdProposal!,
  getAcceptedProposal: (): IProposal => state.acceptedProposal!,
  getRequestByGuarantee: (): IRequest[] => state.requestByGuarantee!,
  getRejectedProposals: (): IProposal[] | undefined => state.rejectedProposals,
  getRejectedRequests: (): IRequest[] | undefined => state.rejectedRequests,
  getStateToFilter: (): boolean => state.isToFilter
}

