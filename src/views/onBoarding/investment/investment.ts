import { defineComponent, shallowRef } from 'vue'
import Investment from '../../../components/FlowOnBoarding/Investment/Investment.vue'

export default defineComponent({
  name: 'InvestmentView',
  setup () {
    const component = shallowRef({
      isComponent: Investment
    })

    return {
      component
    }
  }
})
