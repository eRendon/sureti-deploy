import { reactive } from 'vue'
import { ITypeUserStore } from '@/interfaces/ITypeUser'

const state = reactive<ITypeUserStore>({
  indicators: [],
  isClient: false,
  isInvestor: false
})

export default state
