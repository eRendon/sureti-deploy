import { reactive } from "@vue/reactivity"
import { ILoader } from "../../../interfaces/ILoader"

const state = reactive<ILoader>({
  dots: {
    spinnerDots: false,
    text: ''
  },
  overlay: {
    spinnerDots: false,
    text: ''
  }
})

export default state