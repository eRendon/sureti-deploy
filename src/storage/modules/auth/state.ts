import { reactive } from 'vue'
import {IAuthStorage} from '@/interfaces/IAuth';

const state = reactive<IAuthStorage>({
  auth: {
    isLoggedIn: false
  },
  isNewUser: true
})

export default state
