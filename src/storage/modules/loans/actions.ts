import { loanRequest } from '@/api-client'
import mutations from '@/storage/modules/loans/mutations'
import getters from '@/storage/modules/loans/getters'
import { guaranteeStore } from '@/storage'

export default {
    async getLoans () {
        const { data, success } = await loanRequest.getLoans()
        console.log('getLoans', data)
        if (success) {
          const guarantees = guaranteeStore.getters.getGuaranteesState()
          if (data.length > 0){
            guarantees.map((guarantee) => {
              guarantee.loan = data.find((loan) => loan.guarantee_id === guarantee.guarantee_id)
            })
            console.log('filtradas', guarantees)
            guaranteeStore.mutations.setStateGuarantees(guarantees)
            mutations.setStateLoans(data)
          }
        }
    },
    async getProposals () {
        const { data, success } = await loanRequest.getProposals()
        console.log('getProposals', data)
        if (success) {
            mutations.setStateProposal(data)
        }
    },
    async getRequest () {
        const { data, success } = await loanRequest.requestProposal()
        console.log('getRequest', data)
        if (success) {
            mutations.setStateRequest(data)
        }
    },
    filterLoan (guarantee_id: string) {
        const loans = getters.getLoans()
        const loan = loans.find((loan) => {
            if (loan.guarantee_id === guarantee_id && (loan.state !== 'rechazada' && loan.state !== 'atendida')) {
                return loan
            }
        })
        if (loan) {
            mutations.setStateActiveLoan(loan)
        }
    },
    filterRequest (guarantee_id: string) {
        const requests = getters.getRequests()
        const activeRequest = requests.filter((request) => {
            if (request.state !== 'rechazada' && request.state !== 'atendida') {
                return request
            }
        }).find((request) => {
            return request.guarantee_id === guarantee_id
        })
        const inactiveRequest = requests.filter((request) => (request.state === 'rechazada' || request.state === 'atendida')).filter((request) => request.guarantee_id === guarantee_id)

        const rejectedRequests = requests.filter((request) => (request.state === 'rechazada'))

        if (activeRequest) {
            mutations.setStateActiveRequest(activeRequest)
            mutations.setStateInactiveRequests(inactiveRequest)
            this.filterProposal(activeRequest.transaction_id!)
        }
        mutations.setRejectedRequests(rejectedRequests)
    },
    filterProposal (transaction_id: string) {
        const proposals = getters.getProposals()
        const createProposal = proposals.find((proposal) => {
            if (proposal.loan_request_id === transaction_id && (proposal.state !== 'rechazada' && proposal.state !== 'atendida' && proposal.state !== 'aceptada')) {
                return proposal
            }
        })

        const acceptedProposal = proposals.find((proposal) => {
            if (proposal.loan_request_id === transaction_id && (proposal.state !== 'rechazada' && proposal.state !== 'atendida' && proposal.state !== 'creada')) {
                return proposal
            }
        })

      console.log('acceptedProposal', acceptedProposal)

        const inactiveRequest = proposals.filter((proposal) => (proposal.state === 'rechazada' || proposal.state === 'atendida')).filter((proposal) => proposal.loan_request_id === transaction_id)

        const rejectedProposals = proposals.filter((proposal) => proposal.state === 'rechazada')

        if (createProposal) {
            mutations.setStateCreatedProposal(createProposal)
            mutations.setStateInactiveProposals(inactiveRequest)
        }
        if (acceptedProposal){
            mutations.setStateAcceptedProposal(acceptedProposal)
        }
        mutations.setRejectedProposals(rejectedProposals)
    }
}
