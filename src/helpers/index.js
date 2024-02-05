export function debounce(func, delay = 100) {
    let timer

    return () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            console.log('func')
            return func()
        }, delay)
    }
}