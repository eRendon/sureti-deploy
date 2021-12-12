import { ILoadingDots } from '@/interfaces/ILoader'
import { authStorage, loaderStore, modalStore, userStorage } from '@/storage'
import { apiClient } from '@/api-client/axios/config'
import { ILogin } from '@/interfaces/IAuth'
import { authRequest } from '@/api-client'
import { IAlert } from '@/interfaces/IAlert'
import parseJwt from '@/utils/deserializeJwt'
import router from '@/router'

/**
ToDo LoginUser used to logIn in anything component
* Pushing to verify view or dashboard view
* @param loginForm
*/




const loginAction = async (loginForm: ILogin): Promise<void> => {
    const stateDots: ILoadingDots = {
        spinnerDots: true
    }
    loaderStore.actions.loadingOverlay(stateDots).present()
    apiClient.defaults.headers.common['Authorization'] = ''
    loginForm.user = loginForm.user.toLowerCase()
    const { success, data } = await authRequest.logIn(loginForm)
    if (success) {
        localStorage.setItem('loginForm', JSON.stringify(loginForm))
        if (data.redirect_to === 'activate') {
            const alert: IAlert = {
                show: true,
                text: 'Por favor, verifique su cuenta'
            }
            modalStore.actions.alert(alert).present()
            await router.push({
                name: 'Verify',
                params: {
                    token: data.token
                }
            })
            loaderStore.actions.loadingOverlay().dismiss()
            return
        }
        const deserializeJwt = parseJwt(data.token!)
        if (!deserializeJwt.sub_rol) {
            const alert: IAlert = {
                show: true,
                text: 'Email o contraseña incorrecta'
            }
            modalStore.actions.alert(alert).present()
            loaderStore.actions.loadingOverlay().dismiss()
            return
        }
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
        authStorage.actions.stateAuth(data)
        await userStorage.actions.getProfile()
    }
}

export default loginAction