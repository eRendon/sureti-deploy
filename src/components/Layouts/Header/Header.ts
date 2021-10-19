import { defineComponent, computed } from 'vue'
import { userTypeStore, authStorage, modalStore, userStorage } from '../../../storage'
import Profile from '@/components/DashBoard/SidebarProfile/SidebarProfile.vue'
import { useRouter } from 'vue-router'
import router from '@/router'


export default defineComponent({
    name: 'HeaderLayout',
    components: {
        Profile
    },
    setup () {
        const auth = computed(() => authStorage.getters.getStateAuth());
        const isClient = computed<boolean>(() => userTypeStore.getters.getIsClient())
        const isInvestor = computed<boolean>(() => userTypeStore.getters.getIsInvestor())

        const isBrowsing = computed<string>(() => userStorage.getters.getStateBrowser())
        const router = useRouter()

        const profile = computed(() => userStorage.getters.getStateProfile())

        const onLoadInvestment = async (): Promise<void> => {
            userStorage.mutations.setStateBrowser('inversiones')
            if (profile.value.user_type === 'investor') {
                await router.push({
                    name: 'Dashboard'
                })
                userTypeStore.actions.loadFlowInvestment()
                return
            }
            await router.push({
                name: 'Investment',
                params: {
                    intention: 'dashboard'
                }
            })
        }

        const onLoadClient = async (): Promise<void> => {
            userStorage.mutations.setStateBrowser('prestamos')
            if (profile.value.user_type === 'client') {
                await router.push({
                    name: 'Dashboard'
                })
                await userTypeStore.actions.loadFlowClient()
                return
            }
            await router.push({
                name: 'Loans',
                params: {
                    intention: 'dashboard'
                }
            })
        }

        const openProfile = (): void => {
            modalStore.mutations.setStateProfileModal(true)
        }

        const logOut = async () => {
            await authStorage.actions.logOut()
        }

        return {
            onLoadClient,
            onLoadInvestment,
            openProfile,
            logOut,
            auth,
            isBrowsing,
            isClient,
            isInvestor
        }
    }
})
