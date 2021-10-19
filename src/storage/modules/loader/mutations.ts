import { ILoadingDots } from "../../../interfaces/ILoader"
import state from "./state"

export default {
  setOverlayState(stateDots: ILoadingDots): void {
    state.overlay = stateDots
  },
}