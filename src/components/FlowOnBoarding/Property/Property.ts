import { defineComponent, ref } from 'vue'
import { IAlert } from '@/interfaces/IAlert'
import { modalStore } from '@/storage'

export default defineComponent({
  name: 'PropertyComponent',
  props: {
    isOnBoarding: {
      type: Boolean,
      default: true
    }
  },
  setup (props, { emit }) {

    const valueProperty = ref(0)
    const isFreeDebt = ref(false)

    const recordGuarantee = (): void => {
      if (isFreeDebt.value && valueProperty.value > 0) {
        emit('onRecordGuarantee', valueProperty.value)
        return
      }

      const alert: IAlert = {
        show: true,
        text: 'No se puede generar un préstamo si la garantía no está libre'
      }
      modalStore.actions.alert(alert).present()
    }

    return {
      isFreeDebt,
      valueProperty,
      recordGuarantee
    }
  }
})
