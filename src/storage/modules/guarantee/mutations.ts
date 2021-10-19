import state from "./state"
import { IGuarantee } from '@/interfaces/IGuarantee'

export default {
  setStateGuarantees (guarantees: IGuarantee[]): void {
    state.guarantees = guarantees
  },
  setSelectedGuarantee (guarantee: IGuarantee): void {
    state.selectedGuarantee = guarantee
  }
}