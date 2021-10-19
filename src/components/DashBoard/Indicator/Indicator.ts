import { defineComponent } from 'vue'
import { IIndicator } from '../../../interfaces/IIndicator'

export default defineComponent({
    name: 'Indicators',
    props: {
        data: {
            type: Object as () => IIndicator,
            default: () => {}
        }
    }
})