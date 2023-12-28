// TODO analizar y ver posibilidad de un test
export const initializeStickyBanner = () => {
    const scriptElement = document.getElementById('getStickyBanner');

    const banners =
        Array.from(
            document.querySelectorAll(
                `${scriptElement.getAttribute('data-banner-classes')}`
            )
        ) || [];

    const viewportLimit =
        document.querySelector(
            `${scriptElement.getAttribute('data-viewport')}`
        ) || {};

    const content = document.querySelector('#content') || {};

    let paddingTop = 0;
    let oldScrollY = window.scrollY;

    const handleSticky = (banner = {}) => {
        const isScrollUp = oldScrollY > window.scrollY;
        const { top: topViewportLimit } = viewportLimit.getBoundingClientRect();
        const viewPoint = topViewportLimit - banner.clientHeight;

        if (viewPoint <= 0 && banner.classList.contains('--sticky')) {
            if (content instanceof Element) {
                paddingTop =
                    parseFloat(
                        window
                            .getComputedStyle(content)
                            .getPropertyValue('padding-top')
                    ) || 0;
            }
            banner.classList.remove('--sticky');
            banner.style.top =
                Math.abs(
                    viewportLimit.offsetTop - banner.clientHeight - paddingTop
                ) + 'px';
            banner.style.position = 'relative';
        } else if (viewPoint > 0 && !banner.classList.contains('--sticky')) {
            banner.classList.add('--sticky');
            banner.style.cssText = '';
        }

        if (isScrollUp) {
            banner.classList.remove('--sticky');
            banner.style.top = '0';
        }
    };

    window.addEventListener('scroll', () => {
        banners.forEach(handleSticky);
        oldScrollY = window.scrollY;
    });
};

window.addEventListener('DOMContentLoaded', initializeStickyBanner);
