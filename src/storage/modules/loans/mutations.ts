import { ILoan } from '@/interfaces/ILoans'
import state from '@/storage/modules/loans/state'
import { IProposal } from '@/interfaces/IProposal'
import { IRequest } from '@/interfaces/IRequest'


export default {
    setStateLoans (loans: ILoan[]): void {
        state.loans = loans
    },
    setStateProposal (proposal: IProposal[]): void {
        state.proposals = proposal
    },
    setStateRequest (request: IRequest[]): void {
        state.requests = request
    },
    setStateCreatedProposal (proposal: IProposal): void {
        state.createdProposal = proposal
    },
    setStateAcceptedProposal (proposal: IProposal): void {
        state.acceptedProposal = proposal
    },
    setStateActiveLoan (loan: ILoan): void {
        state.activeLoan = loan
    },
    setStateActiveRequest (request: IRequest): void {
        state.activeRequest = request
    },
    setStateInactiveRequests (requests: IRequest[]): void {
        state.inactiveRequests = requests
    },
    setStateInactiveProposals (proposals: IProposal[]): void {
        state.inactiveProposals = proposals
    },
    setRequestByGuarantee (requests: IRequest[]): void {
        state.requestByGuarantee = requests
    },
    setRejectedRequests (requests: IRequest[] | undefined): void {
        state.rejectedRequests = requests
    },
    setRejectedProposals (proposals: IProposal[]): void{
        state.rejectedProposals = proposals
    },
    setStateToFilter (payload: boolean): void {
        state.isToFilter = payload
    }
}
