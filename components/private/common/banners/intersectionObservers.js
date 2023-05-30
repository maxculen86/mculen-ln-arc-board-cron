/* eslint-disable no-console */
import { queueGoogletagCommand } from '../../LN/common/utils/bannerHelper';
import { filterBanners } from './lazyBannersHelper';
import getViewport from '../../LN/common/utils/screenHelper';
import { bannersLazy } from './bannersHome.json';
import { bannersLazy as bannersLazyLN10 } from './bannersHomeLN10.json';

// TODO eliminar la condicion isLN10, reemplazar banners lazy y ver posibilidad de testeo
export const createBannersIntersectionObserver = isLN10 => {
    const { device } = getViewport();
    const banners = filterBanners(isLN10 ? bannersLazyLN10 : bannersLazy);

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

export const createDifferVideosObserver = () => {
    const lazyVideos = [].slice.call(
        document.querySelectorAll('video.ln-video')
    );

    const videosCallback = entries => {
        entries.forEach(video => {
            const lazyVideo = video.target;
            if (video.isIntersecting) {
                lazyVideo.src = lazyVideo.dataset.src;
                lazyVideo.play();
            } else {
                lazyVideo.stop();
            }
        });
    };

    const lazyVideoObserver = new IntersectionObserver(videosCallback);

    lazyVideos.forEach(lazyVideo => {
        lazyVideoObserver.observe(lazyVideo);
    });
};
