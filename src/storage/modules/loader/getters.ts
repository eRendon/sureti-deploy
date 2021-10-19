import { ILoadingDots } from "../../../interfaces/ILoader";
import state from "./state";

export default {
  getOverlayModal: (): ILoadingDots => state.overlay
}
