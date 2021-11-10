import { computed, defineComponent, ref, UnwrapRef } from 'vue'
import { IGuarantee } from '@/interfaces/IGuarantee'
import { guaranteeStore, modalStore, userStorage } from '../../../storage'
import { useRouter } from 'vue-router'
import NewGuarantee from '@/components/Modals/NewGuarantee/NewGuarantee.vue'

export default defineComponent({
  name: 'Guarantee',
  components: {
    NewGuarantee
  },
  props: {
    isToPayment: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {

    const router = useRouter()

    const detailGuarantee = ref(-1)

    const guarantees = computed<IGuarantee[]>(() => guaranteeStore.getters.getGuaranteesState())

    const stateBrowser = computed(() => userStorage.getters.getStateBrowser())

    const goToDetail = async (id: UnwrapRef<IGuarantee['guarantee_id']>): Promise<void> => {
      console.log(id)
      await router.push({
        name: 'Guarantee',
        params: {
          id: id!
        }
      })
    }

    const onDetailGuarantee = (index: number, selectedGuarantee: IGuarantee): void => {
      if (!props.isToPayment) {
        detailGuarantee.value === index ? detailGuarantee.value = -1 : detailGuarantee.value = index
        return
      }
      console.log(selectedGuarantee)
      guaranteeStore.mutations.setSelectedGuarantee(selectedGuarantee)
    }

    const newGuarantee = (): void => {
      modalStore.mutations.setStateNewGuarantee(true)
    }

    return {
      onDetailGuarantee,
      detailGuarantee,
      stateBrowser,
      guarantees,
      goToDetail,
      newGuarantee
    }
  }
})
