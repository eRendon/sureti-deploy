import { computed, DefineComponent, defineComponent, ref, shallowRef, triggerRef } from 'vue'
import { modalStore } from '@/storage'
import Property from '@/components/FlowOnBoarding/Property/Property.vue'
import Quota from '@/components/FlowOnBoarding/Quota/Quota.vue'

export default defineComponent({
    name: 'NewGuarantee',
    setup () {
        const showNewGuarantee = computed(() => modalStore.getters.getStateNewGuarantee())
        const valueProperty = ref(0)
        const component = shallowRef<{ isComponent: DefineComponent<any, any, any>}>({
            isComponent: Property
        })

        const onDismissModal = (): void => {
            modalStore.mutations.setStateNewGuarantee(false)
            component.value.isComponent = Property
            triggerRef(component)
        }

        const onRecordGuarantee = (value: number): void => {
            component.value.isComponent = Quota
            triggerRef(component)
            valueProperty.value = value
        }

        return {
            onRecordGuarantee,
            onDismissModal,
            valueProperty,
            showNewGuarantee,
            component
        }
    }
})