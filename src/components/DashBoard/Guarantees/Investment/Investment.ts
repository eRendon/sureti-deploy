import { defineComponent } from 'vue'
import { IInvestment } from '@/interfaces/IInvestment'

export default defineComponent({
    name: 'Investments',
    props: {
        investment: {
            type: Object as () => IInvestment,
            default: () => ({})
        }
    }
})