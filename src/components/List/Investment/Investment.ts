import { computed, defineComponent, ref } from 'vue'
import { IGuaranteeInInvestment, IInvestment } from '@/interfaces/IInvestment'
import { investmentStore } from '@/storage'
import Guarantee from '@/components/DashBoard/Guarantees/Guarantee/Guarantee.vue'
import InvestmentGuarantee from '@/components/DashBoard/Guarantees/Investment/Investment.vue'
import Movements from '@/components/List/Movements/Movements.vue'

export default defineComponent({
    name: 'Investment',
    components: {
        Guarantee,
        InvestmentGuarantee,
        Movements
    },
    setup () {

        const showDetail = ref(false)
        const investments = computed<IInvestment[]>(() => investmentStore.getters.getInvestments())

        const guarantees = computed<IGuaranteeInInvestment[]>( () => investmentStore.getters.getGuarantees())

        const guaranteeSelected = computed<IGuaranteeInInvestment>(() => investmentStore.getters.getSelectedGuarantee())

        const onSelectedGuarantee = (guarantee: IGuaranteeInInvestment): void => {
            investmentStore.mutations.setSelectedGuarantee(guarantee)
            if (!showDetail.value) showDetail.value = true
        }

        const onDismissModal = (): void => {
            showDetail.value = false
        }

        return {
            guarantees,
            investments,
            showDetail,
            guaranteeSelected,
            onSelectedGuarantee,
            onDismissModal
        }
    }
})