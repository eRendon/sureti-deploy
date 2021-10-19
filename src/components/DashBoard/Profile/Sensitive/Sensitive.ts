import { computed, defineComponent, ref } from 'vue'
import { authRequest, userRequest } from '@/api-client'
import { loaderStore, modalStore, userStorage } from '@/storage'
import { ISensitiveInformation } from '@/interfaces/IUser'
import { IAlert } from '@/interfaces/IAlert'

export default defineComponent({
    name: 'SensitiveProfile',
    setup () {

        const isToUpdate = ref<boolean>(false)

        const profile = computed(() => userStorage.getters.getStateProfile())

        const sensitiveData = computed<ISensitiveInformation>({
            get: () => {
                const {
                    cell_phone,
                    email,
                    mfa_email,
                    mfa_phone,
                    password,
                    temporal_code
                } = profile.value
                const sensitive: ISensitiveInformation = {
                    cell_phone,
                    email,
                    mfa_email,
                    mfa_phone,
                    password,
                    temporal_code
                }
                return sensitive
            },
            set: (sensitive) => {
               console.log('nueva data', sensitive)
            }
        })

        const getCode = async () => {
            loaderStore.actions.loadingOverlay({ spinnerDots: true }).present()
            const { data, success } = await authRequest.operation()
            console.log('getCode', data)
            if (success) {
                isToUpdate.value = true
            }
            loaderStore.actions.loadingOverlay().dismiss()
        }

        const updateSensitiveInformation = async () => {
            console.log(sensitiveData)
            if (sensitiveData.value.temporal_code) {
                loaderStore.actions.loadingOverlay({ spinnerDots: true }).present()
                const { data, success } = await userRequest.updateSensitiveInformation(sensitiveData.value)
                console.log('SensitiveInformation', data)
                if (success) {
                    const alert: IAlert = {
                        show: true,
                        text: 'Su informacion se ha actualizado correctamente'
                    }
                    modalStore.actions.alert(alert).present()
                    await userStorage.actions.getProfile()
                    isToUpdate.value = false
                } else {
                    const alert: IAlert = {
                        show: true,
                        text: 'El codigo ingresado es incorrecto'
                    }
                    modalStore.actions.alert(alert).present()
                }
            }
            loaderStore.actions.loadingOverlay().dismiss()
        }

        return {
            updateSensitiveInformation,
            getCode,
            sensitiveData,
            isToUpdate
        }
    }
})