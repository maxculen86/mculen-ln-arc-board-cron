import { filterBanners } from './lazyBannersHelper';
import getViewport from '../../LN/common/utils/screenHelper';
import { bannersLazy } from './bannersHomeLN10.json';
import { queueGoogletagCommand } from '../../LN/common/utils/bannerHelper';

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
                buttonHeaderDefault.classList.add('--none');
                buttonSticky.classList.remove('--none');
            } else {
                wrapper.classList.remove('--top-fixed');
                buttonHeaderDefault.classList.remove('--none');
                buttonSticky.classList.add('--none');
            }
        });
    };
    const interSectionObserver = new IntersectionObserver(callback);

    const buttonHeaderDefault = document.querySelector(
        '#button-header-default'
    );
    const buttonSticky = document.querySelector('#button-sticky');

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
            if (video.isIntersecting && lazyVideo.paused) {
                if (!lazyVideo.src) {
                    lazyVideo.src = lazyVideo.dataset.src;
                }
                lazyVideo.play();
            } else {
                lazyVideo.pause();
            }
        });
    };

    const lazyVideoObserver = new IntersectionObserver(videosCallback);

    lazyVideos.forEach(lazyVideo => {
        lazyVideoObserver.observe(lazyVideo);
    });
};

export const createDifferYoutubeVideosObserver = () => {
    const lazyYoutubeVideos = [].slice.call(
        document.querySelectorAll('div.embed-code')
    );

    const youtubeVideosCallback = entries => {
        entries.forEach(ytVideo => {
            const lazyYtVideo = ytVideo.target.children;
            const [lazyYtVideoIframe] = lazyYtVideo;
            if (ytVideo.isIntersecting) {
                if (!lazyYtVideoIframe.src) {
                    lazyYtVideoIframe.src = ytVideo.target.dataset.src;
                }
                handleVideoEvents('playVideo', lazyYtVideoIframe);
            } else {
                handleVideoEvents('stopVideo', lazyYtVideoIframe);
            }
        });
    };
    const lazyYoutubeVideoObserver = new IntersectionObserver(
        youtubeVideosCallback,
        { rootMargin: '0px 0px 300px 0px' }
    );
    lazyYoutubeVideos.forEach(lazyVideo => {
        lazyYoutubeVideoObserver.observe(lazyVideo);
    });
};

export const handleVideoEvents = (event, videoIframe) => {
    videoIframe.contentWindow.postMessage(
        `{"event":"command","func":"${event}","args":""}`,
        '*'
    );
};
