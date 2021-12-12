declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'simple-mask-money' {
  interface Arg {
    allowNegative: boolean,
    negativeSignAfter: boolean,
    prefix: string,
    suffix: string,
    fixed: boolean,
    fractionDigits: number,
    decimalSeparator: string,
    thousandsSeparator: string,
    cursor: string
  }
  function setMask(inputId: string, args: Arg): void
  function formatToNumber(value: string | number): void
}