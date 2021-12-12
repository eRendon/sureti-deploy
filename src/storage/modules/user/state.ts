import { reactive } from 'vue'
import { IUserStore } from '@/interfaces/IUser';

const state = reactive<IUserStore>({
  profile: {},
  isBrowsing: '',
  toGetMovements: false
})

export default state
