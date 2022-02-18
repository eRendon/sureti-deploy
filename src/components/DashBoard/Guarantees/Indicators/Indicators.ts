import { computed, defineComponent } from 'vue'
import { IIndicator } from '@/interfaces/IInvestment'

interface TypeIndicator {
    type?: 'currency' | 'text'
}

export default defineComponent({
    name: 'GuaranteeIndicators',
    props: {
        data: {
          type: Array as () => IIndicator[],
          default: () => ([]),
            required: true
        },
        balance: {
            type: Number,
            default: 0
        },
        indicatorType: {
            type: String,
            default: ''
        },
        pendingInterest: {
            type: Number,
            default: 0
        }

    },
    setup (props) {

        const styleClass = computed<string>(() => {
            if (props.indicatorType === 'currency') {
                return pendingBalance(props.balance)
            }
            return ''
        })

        const pendingBalance = (value: number): string => {
            if (Number(props.balance) === 0) {
                return 'normal-black'
            }
            const dailyInterest = (value * 0.013) / 30
            const totalInterest = Number(props.pendingInterest) / dailyInterest
            if (totalInterest < 45) {
                return 'good-green'
            } else if (totalInterest >= 45 && totalInterest < 90) {
                return 'late-yellow'
            } else if (totalInterest >= 90 && totalInterest < 120) {
                return 'very-late-orange'
            } else if (totalInterest >= 120) {
                return 'urgent-red'
            }
            return ''
        }

        return {
            styleClass
        }
    }
})