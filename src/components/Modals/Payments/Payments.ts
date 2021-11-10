import { computed, defineComponent, onMounted, ref, inject } from 'vue'
import { IGuarantee } from '@/interfaces/IGuarantee'
import { guaranteeStore, loaderStore, modalStore, userStorage } from '@/storage'
import GuaranteeList from '@/components/List/Guarantee/Guarantee.vue'
import { IPayment, IPaymentModal } from '@/interfaces/IPayment'
import { fileRequest, paymentsRequest } from '@/api-client'
import { IPaymentDocument } from '@/interfaces/IFiles'
import { IAlert } from '@/interfaces/IAlert'
import { ILoadingDots } from '@/interfaces/ILoader'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Payments',
  components: {
    GuaranteeList
  },
  setup() {
    const guarantees = computed<IGuarantee[]>(() => guaranteeStore.getters.getGuaranteesState())
    const selectedGuarantee = computed<IGuarantee>(() => guaranteeStore.getters.getSelectedGuarantee())
    const statePayments = computed<IPaymentModal>(() => modalStore.getters.getStatePaymentsModal())
    const file = ref<File>()
    const confirmSend = ref<boolean>(false)
    const guarantee_id_params = ref()
    const payment = ref<IPayment>({
      amount: 0
    })


    const route = useRoute()

    const onCancelSelected = (): void => {
      payment.value.pay_out_date = ''
      payment.value.amount = 0
      if (!guarantee_id_params.value) {
        guaranteeStore.mutations.setSelectedGuarantee({})
      }
    }

    onMounted(() => {
      const { id } = route.params
      console.log('guarantee_id_params', id)
      guarantee_id_params.value = id
    })

    const profile = computed(() => userStorage.getters.getStateProfile())

    const totalCapitalDebt = computed(() => Number(profile.value.total_loans!) - Number(profile.value.total_capital_payments!))
    const totalInterestDebt = computed(() => Number(profile.value.total_loans_interest) - Number(profile.value.total_interest_payments))

    const onDismissModal = (): void => {
      modalStore.actions.paymentModal({ show: false})
      onCancelSelected()
    }

    const onSelectFile = (selectedFile: File[]): void => {
      console.log(selectedFile)
      file.value = selectedFile[0]
    }

    const onCreatePayment = async (): Promise<void> => {
      if (confirmSend.value) {
        const stateDots: ILoadingDots = {
          spinnerDots: true
        }
        loaderStore.actions.loadingOverlay(stateDots).present()
        payment.value.loan_id = selectedGuarantee.value.loan?.loan_id
        payment.value.user_id = profile.value.user_id
        payment.value.payment_type = statePayments.value.isCapitalPayment ? 'capital' : 'interest'
        const { data, success } = await paymentsRequest.createPayment(payment.value)
        console.log('onCreatePayment', data)
        if (success) {
          userStorage.mutations.setStateGetMovements(true)
          await uploadPaymentFile(data.payment_id)
          userStorage.mutations.setStateGetMovements(false)
          return
        }
        const alert: IAlert = {
          text: 'Tuvimos un error procesando su pago, por favor inténtelo más tarde',
          show: true
        }
        modalStore.actions.alert(alert).present()
        loaderStore.actions.loadingOverlay().dismiss()
      }
    }

    const uploadPaymentFile = async (payment_id: string): Promise<void> => {
      const paymentDocument: IPaymentDocument = {
        payment_id,
        file: file.value,
        file_name: file.value?.name,
        user_id: profile.value.user_id,
        description: payment.value.payment_type,
        doc_type: payment.value.payment_type,
      }
      const { data, success } = await fileRequest.sendPaymentDocument(paymentDocument)
      console.log(data)
      if (success) {
        const alert: IAlert = {
          text: 'Sus datos han sido cargados correctamente',
          show: true
        }
        onDismissModal()
        modalStore.actions.alert(alert).present()
      }
      loaderStore.actions.loadingOverlay().dismiss()
    }

    const onValidatePayment = computed<boolean>(() => {
      return !(payment.value.amount! > 0 && payment.value.pay_out_date && file.value);

    })

    return {
      payment,
      profile,
      guarantees,
      selectedGuarantee,
      statePayments,
      totalCapitalDebt,
      confirmSend,
      totalInterestDebt,
      guarantee_id_params,
      onCancelSelected,
      onDismissModal,
      onCreatePayment,
      onSelectFile,
      onValidatePayment
    }
  }
})
