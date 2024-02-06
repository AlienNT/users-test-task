export function debounce(func, delay = 100) {
    let timer

    return () => {
        clearTimeout(timer)
        timer = setTimeout(() => func(), delay)
    }
}

export function getInitials(...fields) {
    return fields?.length ?
        fields.map(string => string?.length ? string[0].toUpperCase() : '') :
        null
}

export function fileToBase(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
}