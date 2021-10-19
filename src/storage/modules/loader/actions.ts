import { IActionSpinner, ILoadingDots } from '../../../interfaces/ILoader'
import mutations from './mutations'

export default {
  loadingOverlay(stateDots?: ILoadingDots): IActionSpinner {
    function present() {
      console.log(stateDots)
      mutations.setOverlayState(stateDots!)
    }

    function dismiss(): void {
      const state: ILoadingDots = {
        spinnerDots: false,
        text: ''
      }
      setTimeout(() => {
        mutations.setOverlayState(state)
      }, 1000)
    }

    return {
      present,
      dismiss
    }
  },
}