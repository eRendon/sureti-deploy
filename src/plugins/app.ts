import { createApp } from 'vue'

import App from '../App.vue'
import { formatCurrency } from '@/plugins/filters'

const app = createApp(App);

app.config.globalProperties.$filters = {
  formatCurrency
}

// app.mixin(currency)

export default app
