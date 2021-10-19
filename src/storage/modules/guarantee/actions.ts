import { guaranteeRequest } from '@/api-client'
import mutations from './mutations'
import getters from '@/storage/modules/guarantee/getters'

export default {
  async getGuarantees (): Promise<void> {
    const { data, success } = await guaranteeRequest.get()
    console.log(data)
    if (success) {
      mutations.setStateGuarantees(data)
    }
  },
  filterSelectedGuarantee (id: string): void {
    const selectedGuarantee = getters.getGuaranteesState().find((guarantee) => {
      return guarantee.guarantee_id === id
    })

    mutations.setSelectedGuarantee(selectedGuarantee!)
  }
}