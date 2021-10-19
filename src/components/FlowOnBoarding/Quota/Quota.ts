import { computed, defineComponent, ref, inject } from 'vue'
import { IGuarantee } from '@/interfaces/IGuarantee'
import { guaranteeStore, loaderStore, modalStore, userStorage } from '../../../storage'
import { guaranteeRequest } from '@/api-client'
import { IAlert } from '@/interfaces/IAlert'
import { useRouter } from 'vue-router'
import { ILoadingDots } from '@/interfaces/ILoader'

export default defineComponent({
  name: 'Quota',
  props: {
    guarantee_value: {
      type: Number,
      default: 0
    },
    user_type: {
      type: String,
      default: ''
    },
    isFirsGuarantee: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {

    const quota = computed(() => {
      return {
        max: props.guarantee_value * 0.6,
        min: props.guarantee_value * 0.4
      }
    })

    const router = useRouter()

    const profile = computed(() => userStorage.getters.getStateProfile())
    const guarantee = ref<IGuarantee>({
      guarantee_type: 'property',
      user_id: profile.value.user_id!,
      guarantee_value: 0
    })
    const onCreateLoan = async (): Promise<void> => {
      const stateDots: ILoadingDots = {
        spinnerDots: true
      }
      loaderStore.actions.loadingOverlay(stateDots).present()
      guarantee.value.guarantee_value = props.guarantee_value
      console.log(props.user_type)
      const { data, success } = await guaranteeRequest.create(guarantee.value)
      console.log(data.guarantee_id)
      if (success) {
        const { } = await guaranteeRequest.update(data.guarantee_id, guarantee.value)
        const alert: IAlert = {
          show: true,
          text: 'Se ha creado la garantia exitosamente'
        }
        modalStore.actions.alert(alert).present()
      }

      modalStore.mutations.setStateNewGuarantee(false)
      if (props.isFirsGuarantee) {
        await userStorage.actions.getProfile()
        await router.push({
          name: 'Dashboard'
        })
        loaderStore.actions.loadingOverlay().dismiss()
      } else {
        await guaranteeStore.actions.getGuarantees()
       setTimeout(async () => {
         await router.push({
           name: 'Guarantee',
           params: {
             id: data.guarantee_id
           }
         })
       }, 500)
      }
    }


    return {
      quota,
      onCreateLoan,
      guarantee
    }
  }
})
