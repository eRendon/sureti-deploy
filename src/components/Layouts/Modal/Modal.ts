import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ModalLayout',
    props: {
      showModal: {
          type: Boolean,
          default: false
      }
    },
    setup (props, { emit }) {

        const onDismissModal = () : void => {
            emit('onDismissModal')
        }

        return {
            onDismissModal
        }
    }
})