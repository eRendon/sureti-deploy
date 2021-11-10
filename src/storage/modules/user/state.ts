import { reactive } from 'vue'
import { IUserStore } from '@/interfaces/IUser';

const state = reactive<IUserStore>({
  profile: {},
  isBrowsing: 'prestamos',
  toGetMovements: false
})

export default state
