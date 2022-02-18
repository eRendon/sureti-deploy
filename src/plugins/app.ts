import { createApp } from 'vue'

import App from '../App.vue'
import { formatAmount, formatCurrency } from '@/plugins/filters'

const app = createApp(App);

app.config.globalProperties.$filters = {
  formatCurrency,
  formatAmount
}

// app.mixin(currency)

export default app
