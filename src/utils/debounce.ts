export const debounce = <T extends unknown[], U>(fn: (...args: T) => U, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    return (...args: T) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            fn(...args)
            timeoutId = null
        }, delay)
    }
}