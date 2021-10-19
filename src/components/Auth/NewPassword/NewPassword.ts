import {defineComponent} from 'vue'
import { Form, Field, defineRule } from 'vee-validate'
import { required, confirmed } from '@vee-validate/rules'
import { authRequest } from '@/api-client'
import { IAlert } from '@/interfaces/IAlert'
import { loaderStore, modalStore } from '../../../storage'
import { useRouter } from 'vue-router'
import { apiClient } from '@/api-client/axios/config'
import { ILoadingDots } from '@/interfaces/ILoader'

defineRule('required', required)
defineRule('confirmed', confirmed)

interface ISchema {
  password: string
  confirm_password: string
}

export default defineComponent({
  name: 'NewPasswordComponent',
  components: {
    Form,
    Field,
  },
  setup() {

    const schema: ISchema = {
      password: 'required',
      confirm_password: 'required|confirmed:@password'
    }

    const router = useRouter()

    const onSavePassword = async (value: ISchema) => {
      const stateDots: ILoadingDots = {
        spinnerDots: true
      }
      loaderStore.actions.loadingOverlay(stateDots).present()
      const { success, data } = await authRequest.resetPassword(value.password)
      console.log(data)
      if (success) {
        apiClient.defaults.headers.common['Authorization'] = ''
        const alertData: IAlert = {
          show: true,
          text: 'Su contraseña ha sido actualizada satisfactoriamente'
        }
        modalStore.actions.alert(alertData).present()
        setTimeout(async () => {
          await router.push({
            name: 'Login'
          })
          loaderStore.actions.loadingOverlay().dismiss()
        }, 500)
      } else {
        loaderStore.actions.loadingOverlay().dismiss()
      }
    }

    return {
      schema,
      onSavePassword
    }
  }
})
