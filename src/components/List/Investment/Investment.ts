import { computed, defineComponent } from 'vue'
import { IInvestment } from '@/interfaces/IInvestment'
import { investmentStore } from '@/storage'

export default defineComponent({
    name: 'Investment',
    setup () {

        const investments = computed<IInvestment[]>(() => investmentStore.getters.getInvestments())

        return {
            investments
        }
    }
})