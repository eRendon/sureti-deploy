import { defineComponent } from 'vue'
import { Form, Field, defineRule } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import {IRegister} from '@/interfaces/IAuth';
import {authRequest} from '@/api-client';
import {apiClient} from '@/api-client/axios/config';
import {useRouter} from "vue-router";
import {IAlert} from '@/interfaces/IAlert';
import { loaderStore, modalStore } from '../../../storage';
import { ILoadingDots } from '@/interfaces/ILoader'

defineRule('required', required);
defineRule('email', email);
defineRule('min', min)

export default defineComponent({
  name: 'LoginView',
  components: {
    Form,
    Field,
  },
  setup() {

    const schema = {
      email: 'required|email',
      password: 'required|min:8',
      cell_phone: 'required',
      first_name: 'required',
      last_name: 'required',
      mfa_email: '',
      mfa_phone: '',
      middle_name: ''
    }

    const router = useRouter()

    const submit = async (value: IRegister): Promise<void> => {
      console.log('submit', value)
      const stateDots: ILoadingDots = {
        spinnerDots: true
      }
      loaderStore.actions.loadingOverlay(stateDots).present()
      value.mfa_phone = value.mfa_phone ? value.mfa_phone : false
      value.mfa_email = value.mfa_email ? value.mfa_email : false
      const { data, success } = await authRequest.register(value)
      if (success) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
        const { success: successCode, data: verificationCode } = await authRequest.getVerifyCode()
        if (successCode) {
          const alertData: IAlert = {
            show: true,
            text: 'Se ha enviado un código de verificación'
          }
          modalStore.actions.alert(alertData).present()
          setTimeout(async () => {
            await router.push({
              name: 'Verify',
              params: {
                token: data.token
              }
            })
            loaderStore.actions.loadingOverlay().dismiss()
          }, 500)
        } else {
          const alertData: IAlert = {
            show: true,
            text: 'Este correo o número de celular, ya han sido registrados.'
          }
          modalStore.actions.alert(alertData).present()
          loaderStore.actions.loadingOverlay().dismiss()
        }
      }
    }


    return {
      schema,
      submit
    };
  }
})
