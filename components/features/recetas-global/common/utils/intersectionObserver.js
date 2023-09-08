//TODO: una vez finalizado el fix sobre que todo se ejectuta desde el server, utilizar dentro del header
export const createHeaderObserver = (setSticky, unobserve) => {
    const callback = entries => {
        entries.forEach(entry => {
            setSticky(!entry.isIntersecting);
        });
    };
    const sentinel = document.querySelector('.header-sentinel');
    const intersectionObserver = new IntersectionObserver(callback);
    sentinel && intersectionObserver.observe(sentinel);
    unobserve && intersectionObserver.unobserve(sentinel);
};
