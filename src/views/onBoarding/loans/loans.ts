import { computed, defineComponent, ref, shallowRef, triggerRef, provide, onMounted, DefineComponent } from 'vue'
import Loans from '../../../components/FlowOnBoarding/Loans/Loans.vue'
import Property from '../../../components/FlowOnBoarding/Property/Property.vue'
import Quota from '../../../components/FlowOnBoarding/Quota/Quota.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'LoansView',
  setup () {
    const component = shallowRef<{ isComponent: any}>({
      isComponent: Property
    })

    const user_type = ref('')

    const valueProperty = ref(0)

    const onSelectProperty = (): void => {
      console.log('selected property')
      component.value.isComponent = Property
      triggerRef(component)
    }

    const onSelectCDT = (): void => {

    }

    const onRecordGuarantee = (value: number): void => {
      component.value.isComponent = Quota
      triggerRef(component)
      valueProperty.value = value
    }

    const route = useRoute()

    onMounted(() => {
      const { intention } = route.params
      if (intention) {
        user_type.value = intention as string
      }
      console.log(route.params)
    })

    return {
      component,
      user_type,
      valueProperty,
      onSelectProperty,
      onRecordGuarantee,
    }
  }
})
