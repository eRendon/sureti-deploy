import { DefineComponent, defineComponent, ref, shallowRef, triggerRef } from 'vue'
import PublicProfile from '@/components/DashBoard/Profile/Public/Public.vue'
import SensitiveProfile from '@/components/DashBoard/Profile/Sensitive/Sensitive.vue'
import Bank from '@/components/DashBoard/Profile/Bank/Bank.vue'

export default defineComponent({
    name: 'ProfileView',
    components: {
        PublicProfile,
        SensitiveProfile,
        Bank
    },
    setup() {

        const component = shallowRef<DefineComponent<any, any, any>>(PublicProfile)

        const isPublicProfile = ref<boolean>(true)

        const onSetComponent = (name: string): void => {
            if (name === 'PublicProfile') {
                component.value = PublicProfile
            } else if (name === 'SensitiveProfile') {
                component.value = SensitiveProfile
            } else {
                component.value = Bank
            }
            triggerRef(component)
        }
        return {
            isPublicProfile,
            component,
            onSetComponent
        }
    }
})