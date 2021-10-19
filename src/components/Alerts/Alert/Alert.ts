import {computed, defineComponent} from "vue";
import {IAlert} from "../../../interfaces/IAlert";
import {modalStore} from "../../../storage";

export default defineComponent({
  name: 'AlertComponent',
  setup () {

    const alertState = computed<IAlert>(() => modalStore.getters.getStateAlert())

    const onDismiss = (): void => {
      modalStore.actions.alert().dismiss()
    }

    return {
      alertState,
      onDismiss
    }
  }
})
