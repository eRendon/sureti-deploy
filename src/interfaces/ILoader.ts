export interface ILoadingDots {
    spinnerDots: boolean,
    text?: string
}

export interface ILoader {
    dots: ILoadingDots,
    overlay: ILoadingDots
}

export interface IActionSpinner {
    present: Function,
    dismiss: Function
}