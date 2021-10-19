import {defineComponent, ref} from 'vue';
import { Form, Field, defineRule, useField } from 'vee-validate';
import { required } from '@vee-validate/rules';
import { authRequest } from '@/api-client';
import {IAlert} from '@/interfaces/IAlert';
import { loaderStore, modalStore } from '../../../storage';
import {apiClient} from '@/api-client/axios/config';
import {IResetCode, IResetToken, ISchema} from '@/interfaces/IAuth';
import { ILoadingDots } from '@/interfaces/ILoader'

defineRule('required', required);

export default defineComponent({
  name: 'VerifyComponent',
  components: {
    Form,
    Field,
  },
  props: {
    title: {
      type: String,
      default: 'Verificación de código'
    },
    isGenerateCode: {
      type: Number,
      default: 1,
      required: true
    },
    buttonName: {
      type: String,
      default: 'Verificar',
      required: true
    },
    placeHolder: {
      type: String,
      default: 'code'
    },
    body: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {

    const schema = {
      activation_code: 'required'
    }

    const userTemp = ref('')

    const { value: valueField, resetField, errorMessage } = useField('activation_code', 'required')

    const fieldValidator = ref()

    const resetTokenSchema = ref<IResetToken>({})

    const verifyCode = async (): Promise<void> => {
      const stateDots: ILoadingDots = {
        spinnerDots: true
      }
      loaderStore.actions.loadingOverlay(stateDots).present()
      const schema: ISchema = {
        activation_code: valueField.value as string
      }
      const { data, success } = await authRequest.verifyCode(schema)
      if (success) {
        apiClient.defaults.headers.common['Authorization'] = ''
        const alertData: IAlert = {
          show: true,
          text: 'Su verificación fue exitosa'
        }
        modalStore.actions.alert(alertData).present()
        emit('onVerifyCode')
        loaderStore.actions.loadingOverlay().dismiss()
      }
    }


    const resetToken = async (): Promise<void> => {
      const stateDots: ILoadingDots = {
        spinnerDots: true
      }
      loaderStore.actions.loadingOverlay(stateDots).present()
      resetTokenSchema.value.mfa_code = valueField.value as string
      const { data, success} = await authRequest.resetToken(resetTokenSchema.value)
      if (success) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
        const alertData: IAlert = {
          show: true,
          text: 'Su verificación fue exitosa'
        }
        modalStore.actions.alert(alertData).present()
        emit('onResetToken')
        loaderStore.actions.loadingOverlay().dismiss()
      } else {
        const alertData: IAlert = {
          show: true,
          text: 'El código no coincide'
        }
        modalStore.actions.alert(alertData).present()
        loaderStore.actions.loadingOverlay().dismiss()
      }
    }

    const onGenerateCode = async (): Promise<void> => {
      const stateDots: ILoadingDots = {
        spinnerDots: true
      }
      loaderStore.actions.loadingOverlay(stateDots).present()
      const reset_code: IResetCode = {
        user: valueField.value ? valueField.value as string : userTemp.value
      }
      resetTokenSchema.value.user = reset_code.user
      const { success, data } = await authRequest.generateCode(reset_code)
      console.log(data)
      if (success) {
        const alertData: IAlert = {
          show: true,
          text: 'Si el email existe, recibirá un código de verificación.'
        }
        modalStore.actions.alert(alertData).present()
        emit('onGenerateCode')
        loaderStore.actions.loadingOverlay().dismiss()
        resetField()
      }
    }


    const onVerifySchema = async (): Promise<void> => {
      userTemp.value = valueField.value as string
      if (props.isGenerateCode === 1) {
        await verifyCode()
        return
      } else if (props.isGenerateCode === 2){
        await onGenerateCode()
        return
      }
      await resetToken()
    }

    const validateSchema = async (): Promise<void> => {
      if (props.isGenerateCode === 3) {
        await onGenerateCode()
        return
      }
    }


    return {
      errorMessage,
      valueField,
      fieldValidator,
      schema,
      onVerifySchema,
      validateSchema
    }
  }
})
