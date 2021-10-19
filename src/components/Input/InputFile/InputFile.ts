import {computed, defineComponent} from "vue";
import {fileRequest} from "../../../api-client";
import {IGuaranteeDocument, IPaymentDocument, IUserDocument} from "../../../interfaces/IFiles";
import {authStorage} from "../../../storage";

export default defineComponent({
  name: 'InputFile',
  setup() {
    const auth = computed(() => authStorage.getters.getStateAuth())

    const userDocument = async () => {

      const userDocument: IUserDocument = {
        user_id: auth.value.user_id!,
        description: '',
        file_name: '',
        doc_type: ''
      }
      const { data, success } = await fileRequest.sendUserDocument(userDocument)
      console.log(data)
      if (success) {

      }
    }

    const paymentDocument = async () => {

      const userDocument: IPaymentDocument = {
        user_id: auth.value.user_id!,
        description: '',
        file_name: '',
        doc_type: '',
        payment_id: ''
      }
      const { data, success } = await fileRequest.sendPaymentDocument(userDocument)
      console.log(data)
      if (success) {

      }
    }

    const guaranteeDocument = async () => {

      const userDocument: IGuaranteeDocument = {
        user_id: auth.value.user_id!,
        description: '',
        file_name: '',
        doc_type: '',
        guarantee_id: ''
      }
      const { data, success } = await fileRequest.sendGuaranteeDocument(userDocument)
      console.log(data)
      if (success) {

      }
    }

    const onUploadFile = (file: File): void => {
      console.log(file)
    }

    return {
      onUploadFile
    }
  }
})
