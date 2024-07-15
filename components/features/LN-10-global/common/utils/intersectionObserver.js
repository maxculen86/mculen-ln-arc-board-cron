export const setupIntersectionObserver = (ref, htmlContent) => {
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (ref.current) {
                    ref.current.innerHTML = htmlContent;
                    observer.unobserve(entry.target);
                }
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersection, {
        rootMargin: '0px',
        threshold: 1.0
    });

    if (ref.current) {
        observer.observe(ref.current);
    }

    return () => {
        if (ref.current) {
            observer.unobserve(ref.current);
        }
    };
};
