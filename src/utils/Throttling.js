export function throttle(func, wait) {
    let timeout;
    return function () {
        if (!timeout) {
            timeout = setTimeout(() => {
                func.apply(this, arguments);
                timeout = null;
            }, wait);
        }
    };
}
