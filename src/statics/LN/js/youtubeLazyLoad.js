window.addEventListener('DOMContentLoaded', () => {
    const youtubeIframes = document.querySelectorAll('iframe[data-src]');

    const loadVideo = iframe => {
        const src = iframe.getAttribute('data-src');
        if (!iframe.hasAttribute('data-loaded')) {
            iframe.setAttribute('src', src);
            iframe.setAttribute('data-loaded', 'true');
        }
    };

    const observer = new IntersectionObserver(
        (entries, intersectionObserver) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadVideo(entry.target);
                    intersectionObserver.unobserve(entry.target);
                }
            });
        },
        {
            rootMargin: '100px',
            threshold: 0.1
        }
    );

    youtubeIframes.forEach(iframe => observer.observe(iframe));

    const mutationObserver = new MutationObserver(() => {
        const newIframes = document.querySelectorAll(
            'iframe[data-src]:not([data-loaded])'
        );
        newIframes.forEach(iframe => observer.observe(iframe));
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });
});
