import {defineComponent, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {IAlert} from '@/interfaces/IAlert';
import {modalStore} from "../../../storage";
import VerifyCode from "../../../components/Auth/VerifyCode/VerifyCode.vue";

export default defineComponent({
  name: 'UserVerifyView',
  components: {
    VerifyCode
  },
  setup() {

    const onVerifyCode = async (value: string): Promise<void> => {
      const alertData: IAlert = {
        show: true,
        text: 'Su verificación fue exitosa'
      }
      modalStore.actions.alert(alertData).present()
      setTimeout(async () => {
        await router.push({
          name: 'Login'
        })
      }, 500)
    }

    const route = useRoute()
    const router = useRouter()

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
