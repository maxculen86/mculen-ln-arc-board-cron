// TODO hacer e investigar como testear script
export const setupScroll = () => {
    const categories = document.querySelector('.com-unordered');
    const rightArrow = document.querySelector('#right-arrow');
    const leftArrow = document.querySelector('#left-arrow');
    if (
        categories.scrollLeft + categories.offsetWidth <
        categories.scrollWidth
    ) {
        rightArrow.classList.remove('hlp-none');
    }
    document.querySelector('#right-arrow').addEventListener('click', () => {
        const scrollPixel = categories.scrollLeft + 150;
        categories.scroll({ left: scrollPixel, behavior: 'smooth' });
        if (
            categories.scrollLeft + categories.offsetWidth >=
            categories.scrollWidth
        ) {
            rightArrow.classList.add('hlp-none');
        }
        leftArrow.classList.remove('hlp-none');
    });
    document.querySelector('#left-arrow').addEventListener('click', () => {
        const scrollPixel = categories.scrollLeft - 150;
        categories.scroll({ left: scrollPixel, behavior: 'smooth' });
        if (categories.scrollLeft === 0) {
            leftArrow.classList.add('hlp-none');
        }
        rightArrow.classList.remove('hlp-none');
    });
};

setupScroll();
