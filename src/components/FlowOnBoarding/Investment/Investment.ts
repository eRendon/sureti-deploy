import { computed, defineComponent, ref } from 'vue'
import { investmentRequest } from '@/api-client'
import { modalStore, userStorage } from '@/storage'
import { CreditLimit } from '@/interfaces/IInvestment'
import { IAlert } from '@/interfaces/IAlert'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'InvestmentComponent',
  setup () {

    const investment = ref<CreditLimit>({})

    const profile = computed(() => userStorage.getters.getStateProfile())

    const router = useRouter()

    const onCreateInvestment = async (): Promise<void> =>  {
      if (investment.value.amount! > 0) {
        investment.value.user_id = profile.value.user_id
        const { data, success } = await investmentRequest.creditLimit(investment.value)
        console.log(data)
        if (success) {
          const alert:IAlert = {
            show: true,
            text: 'Se ha enviado su solicitud correctamente'
          }
          modalStore.actions.alert(alert)
          await userStorage.actions.getProfile()
          await router.push({
            name: 'Dashboard'
          })
          return
        }
        const alert:IAlert = {
          show: true,
          text: 'Tenemos un problema enviando su solicitud, por favor intente nuevamente.'
        }
        modalStore.actions.alert(alert)
      }
    }

    return {
      investment,
      onCreateInvestment
    }
  }
})
