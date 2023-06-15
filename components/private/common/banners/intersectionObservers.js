/* eslint-disable no-console */
import { queueGoogletagCommand } from '../../LN/common/utils/bannerHelper';
import { filterBanners } from './lazyBannersHelper';
import getViewport from '../../LN/common/utils/screenHelper';
import { bannersLazy } from './bannersHomeLN10.json';

// TODO ver posibilidad de testeo
export const createBannersIntersectionObserver = () => {
    const { device } = getViewport();
    const banners = filterBanners(bannersLazy);

    const callback = entries => {
        entries.forEach(entry => {
            banners.forEach(banner => {
                if (
                    entry.isIntersecting &&
                    entry.target.id === banner.opt_div
                ) {
                    queueGoogletagCommand([banner]);
                    interSectionObserver.unobserve(entry.target);
                }
            });
        });
    };

    const interSectionObserver = new IntersectionObserver(callback, {
        rootMargin:
            device === 'mobile' ? '0px 0px 200px 0px' : '0px 0px 300px 0px'
    });

    document.querySelectorAll('.lazy').forEach(el => {
        if (el) interSectionObserver.observe(el);
    });
};

export const createHeaderObserver = () => {
    const callback = entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                wrapper.classList.add('--top-fixed');
            } else {
                wrapper.classList.remove('--top-fixed');
            }
        });
    };
    const interSectionObserver = new IntersectionObserver(callback);

    const subHeader = document.querySelector('.ln-sub-header');
    const wrapper = document.querySelector('.wrapper.homepage');

    if (subHeader) interSectionObserver.observe(subHeader);
};
