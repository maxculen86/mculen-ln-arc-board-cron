export function toggleScroll(isActive) {
    if (typeof window !== 'undefined') {
        window.document.body.classList.toggle('overflow-hidden', isActive);
    }
}
