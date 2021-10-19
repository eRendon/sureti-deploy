import { reactive } from "vue"
import { ILoansStore } from '@/interfaces/ILoans'


const state = reactive<ILoansStore>({
  loans: [{
    state: ''
  }],
  proposals: [],
  requests: [],
  isToFilter: false
})

export default state
