import app from './app'

/*
ToDo Component
*/

import Alert from '../components/Alerts/Alert/Alert.vue'
import Overlay from '../components/Loaders/Overlay/Overlay.vue'
import RequestLoan from '@/components/Modals/RequestLoan/RequestLoan.vue'
import Payments from '@/components/Modals/Payments/Payments.vue'
import Document from '@/components/Document/Document.vue'
/*
ToDo Id-Component
*/

app.component('alert', Alert)
app.component('loading-overlay', Overlay)
app.component('request-loan', RequestLoan)
app.component('payments-modal', Payments)
app.component('document-user', Document)