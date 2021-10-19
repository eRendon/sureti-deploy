import state from "./state";
import { IGuarantee } from '@/interfaces/IGuarantee'

export default {
  getGuaranteesState: (): IGuarantee[] => state.guarantees,
  getSelectedGuarantee: (): IGuarantee => state.selectedGuarantee!
}
