import { reactive } from 'vue'
import { IModalStorage} from '@/interfaces/IAlert';

const state = reactive<IModalStorage>({
  alert: {
    text: '',
    show: false
  },
  showProfileModal: false,
  proposalModal: {
    show: false,
    proposal: {}
  },
  requestModal: {
    show: false,
    request: {}
  },
  payments: {
    show: false
  },
  showNewGuarantee: false
})

export default state
