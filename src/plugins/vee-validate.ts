import { configure } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import es from '@vee-validate/i18n/dist/locale/es.json'

configure({
    generateMessage: localize({
        es
    })
})

setLocale('es')