import { computed, defineComponent } from 'vue'
import { userStorage } from '../../storage'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'OnBoarding',
  setup() {
    const profile = computed(() => userStorage.getters.getStateProfile())
    const router = useRouter()

    const goLoans = async (): Promise<void> => {
      await router.push({
        name: 'Loans',
        params: {
          intention: 'home'
        }
      })
    }

    const goInvestment = async (): Promise<void> => {
      await router.push({
        name: 'Investment',
        params: {
          intention: 'home'
        }
      })
    }

    return {
      profile,
      goLoans,
      goInvestment
    }
  }
})
