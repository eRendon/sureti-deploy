import { computed, defineComponent, ref } from 'vue'
import { IBankAccountInformation, ISensitiveInformation } from '@/interfaces/IUser'
import { loaderStore, modalStore, userStorage } from '@/storage'
import { authRequest, userRequest } from '@/api-client'
import { IAlert } from '@/interfaces/IAlert'

export default defineComponent({
  name: 'BankInformation',
  setup () {

    const profile = computed(() => userStorage.getters.getStateProfile())

    const bank_account_informationData =  ref<IBankAccountInformation[]>([{
      bank: '',
      bank_account_holder: '',
      bank_account_holder_identification: '',
      bank_account_number: '',
      bank_account_type: '',
      bank_account_holder_identification_type: ''
    }])

    const isToUpdate = ref<boolean>(false)


    const sensitiveData = computed<ISensitiveInformation>({
      get: () => {
        const {
          bank_account_information,
          temporal_code
        } = profile.value
        const sensitive: ISensitiveInformation = {
          bank_account_information: !bank_account_information ? bank_account_informationData.value : bank_account_information,
          temporal_code
        }
        return sensitive
      },
      set: (sensitive) => {
        console.log('nueva data', sensitive)
      }
    })



    const onAddBank = () => {
      sensitiveData.value.bank_account_information!.push({
        bank: '',
        bank_account_holder: '',
        bank_account_holder_identification: '',
        bank_account_number: '',
        bank_account_type: '',
        bank_account_holder_identification_type: ''
      })
    }

    const onDeleteBank = (index: number): void => {
      sensitiveData.value.bank_account_information!.splice(index, 1)
    }

    const updateSensitiveInformation = async () => {
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

    const getCode = async () => {
      loaderStore.actions.loadingOverlay({ spinnerDots: true }).present()

      const { data, success } = await authRequest.operation()
      console.log('getCode', data)
      if (success) {
        isToUpdate.value = true
      }
      loaderStore.actions.loadingOverlay().dismiss()

    }

    return {
      onAddBank,
      onDeleteBank,
      getCode,
      updateSensitiveInformation,
      sensitiveData,
      isToUpdate
    }
  }
})