import {defineComponent, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {IAlert} from '@/interfaces/IAlert';
import {modalStore} from "../../../storage";
import VerifyCode from "../../../components/Auth/VerifyCode/VerifyCode.vue";
import loginAction from '@/utils/loginAction'

export default defineComponent({
  name: 'UserVerifyView',
  components: {
    VerifyCode
  },
  setup() {

    /**
     ToDo On Verify Code
     * emitter onVerifyCode when user validation success the code verification
     * @param value
     */

    const onVerifyCode = async (value: string): Promise<void> => {
      const alertData: IAlert = {
        show: true,
        text: 'Su verificación fue exitosa'
      }
      modalStore.actions.alert(alertData).present()
      setTimeout(async () => {
        const loginForm = localStorage.getItem('loginForm')
        if (loginForm) {
          await loginAction(JSON.parse(loginForm))
          return
        }
        await router.push({
          name: 'Login'
        })
      }, 500)
    }

    const route = useRoute()
    const router = useRouter()

    /**
     * ToDo Verify token in router
     * @param token
     * @type string
     * When user is register send token in route params, this component is valid de token if is null, redirect user to login view
     */

    onMounted(async () => {
     const { token } = route.params
      if (!token) {
        await router.push({
          name: 'Login'
        })
      }
    })

    return {
      onVerifyCode
    }
  }
})
