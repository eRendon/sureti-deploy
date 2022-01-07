// import SimpleMaskMoney from "simple-mask-money"
//
// export const regexValue = (s: string | number | any, value: any): void => {
//     const args = {
//         allowNegative: false,
//         negativeSignAfter: false,
//         prefix: '',
//         suffix: '',
//         fixed: true,
//         fractionDigits: 2,
//         decimalSeparator: '.',
//         thousandsSeparator: ',',
//         cursor: 'move'
//     };
//     SimpleMaskMoney.setMask(s, args);
//     SimpleMaskMoney.formatToNumber(value | 0);
// }

export const regexValue = (s: string | number | any): string => {
    if (typeof s === 'number') s = String(s)
    if (typeof s !== 'string' || s === "undefined") return ''
    // return s.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    return parseFloat(s).toFixed(2).replace(/^(d+(?:[.,]d{2})?)$/, '$1,');
}

export const regexValidation = (value: string | number): string => {
    if (typeof value === 'number') value = String(value)
    if (value === "undefined") return ''
    console.log('quita puntos y coma', value.replace(/[, ]+/g, " ").trim())
    return value.replace(/[,]+/g, "").trim();
}