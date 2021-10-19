import {defineComponent} from "vue";
import { Form, Field, defineRule } from 'vee-validate';
import { required, email } from '@vee-validate/rules';
import {ILogin} from '@/interfaces/IAuth';
import { authRequest } from '@/api-client';
import {apiClient} from '@/api-client/axios/config';
import parseJwt from "../../../utils/deserializeJwt";
import {IAlert} from '@/interfaces/IAlert';
import { modalStore, authStorage, userStorage, loaderStore } from '../../../storage';
import { ILoadingDots } from '@/interfaces/ILoader'

defineRule('required', required);
defineRule('email', email);

export default defineComponent({
  name: 'LoginView',
  components: {
    Form,
    Field,
  },
  setup () {
      const schema = {
        user: 'required',
        password: 'required'
      }

      const onLogin = async (loginForm: ILogin) => {
        const stateDots: ILoadingDots = {
          spinnerDots: true
        }
        loaderStore.actions.loadingOverlay(stateDots).present()
        apiClient.defaults.headers.common['Authorization'] = ''
        const { success, data } = await authRequest.logIn(loginForm)
        if (success) {
          const deserializeJwt = parseJwt(data.token!)
          if (!deserializeJwt.sub_rol) {
            const alert: IAlert = {
              show: true,
              text: 'Email o contraseña incorrecta'
            }
            modalStore.actions.alert(alert).present()
            loaderStore.actions.loadingOverlay().dismiss()
            return
          }
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
          authStorage.actions.stateAuth(data)
          await userStorage.actions.getProfile()
        }
      }

      return {
        schema,
        onLogin
      }
  }
})
