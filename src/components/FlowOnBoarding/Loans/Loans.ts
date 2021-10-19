import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoansComponent',
  setup (props, { emit }) {
    const onSelectProperty = (): void => {
      emit('onSelectProperty')
    }

    const onSelectCDT = (): void => {
      emit('onSelectCDT')
    }

    return {
      onSelectProperty,
      onSelectCDT
    }
  }
})
