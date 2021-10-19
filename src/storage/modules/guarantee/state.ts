import { reactive } from "@vue/reactivity"
import { IGuaranteeStorage } from '@/interfaces/IGuarantee'

const state = reactive<IGuaranteeStorage>({
  guarantees: [{
    loan: {}
  }],
  selectedGuarantee: {
    owners: [],
    propertyTax: {
      doc_type: 'IMPUESTO PREDIAL',
      text: 'Impuesto Predial'
    },
    freedomAndTradition: {
      doc_type: 'CERTIFICADO DE LIBERTAD Y TRADICION INICIAL',
      text: 'Certificdo de libertad y tradición'
    }
  },
})

export default state
