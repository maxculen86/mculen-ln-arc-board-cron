/* eslint-disable no-console */
import { queueGoogletagCommand } from '../../LN/common/utils/bannerHelper';
import { filterBanners } from './lazyBannersHelper';
import getViewport from '../../LN/common/utils/screenHelper';
import { bannersLazy } from './bannersHome.json';

const createBannersIntersectionObserver = () => {
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

export default createBannersIntersectionObserver;
