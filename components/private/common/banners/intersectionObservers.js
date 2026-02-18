import { filterBanners } from './lazyBannersHelper';
import getViewport from '../../LN/common/utils/screenHelper';
import { bannersLazy } from './bannersHomeLN10.json';
import { queueGoogletagCommand } from '../../LN/common/utils/bannerHelper';

export const createBannersIntersectionObserver = () => {
    const { device } = getViewport();
    const banners = filterBanners(bannersLazy);

    const interSectionObserver = new IntersectionObserver(
        entries => {
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
        },
        {
            rootMargin:
                device === 'mobile' ? '0px 0px 200px 0px' : '0px 0px 300px 0px'
        }
    );

    document.querySelectorAll('.lazy').forEach(el => {
        if (el) interSectionObserver.observe(el);
    });
};

export const createDifferVideosObserver = () => {
    const { device } = getViewport();
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
            } else if (!video.isIntersecting && !lazyVideo.paused) {
                lazyVideo.pause();
            }
        });
    };

    const lazyVideoObserver = new IntersectionObserver(videosCallback, {
        rootMargin: device === 'mobile' ? '150px 0px' : '250px 0px',
        threshold: 0
    });

    lazyVideos.forEach(lazyVideo => {
        lazyVideoObserver.observe(lazyVideo);
    });
};

export const handleVideoEvents = (event, videoIframe) => {
    videoIframe.contentWindow.postMessage(
        `{"event":"command","func":"${event}","args":""}`,
        '*'
    );
};
