import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';

export const validateVideoPlayer = ({ video, videoId }) => {
    const rules = [
        {
            validation: !videoId,
            message: 'Advertencia. El campo Video es obligatorio'
        },
        {
            validation: videoId && !video,
            message: 'Advertencia. El ID del video es incorrecto'
        }
    ];

    return pageBuilderValidator(rules);
};

export const productClickFromClientVideoJW = (element = {}, name = '') => {
    if (!element) return;

    const { dataset: articleDataSet = {} } = element;

    const { dataset: chainDataSet = {} } = (element.closest &&
        element.closest('[data-is-block]')) || {
        dataset: {
            blockName: '',
            diagramacionId: '',
            chainPosition: '',
            isSubscriptor: false
        }
    };

    const { dataset: sectionDataSet = {} } = (element.closest &&
        element.closest('[data-section]')) || {
        dataset: { section: '' }
    };

    const { chainPosition, diagramacionId, blockName, isSubscriptor, roof } =
        chainDataSet;

    const { section } = sectionDataSet;
    const { pos, id, source } = articleDataSet;

    const isLive = diagramacionId === 'enVivo';
    const itemBrand = isSubscriptor ? 'excSuscriptor' : section;

    const position = `${isLive ? 'lv' : chainPosition || ''}${pos}`;
    const brand = `${itemBrand}_${diagramacionId}`;

    const item = {
        item_list_id: position,
        item_id: id,
        item_variant: source,
        item_brand: brand,
        item_list_name: blockName,
        item_name: name,
        item_category: isLive ? diagramacionId : roof,
        price: 1,
        index: 1,
        quantity: 1
    };

    if (item.item_id) {
        window?.dataLayer?.push({
            event: 'productClickScore',
            item
        });
    }
};

export const createJWVisibilityAndMetarefreshCallback =
    (instance, getPlayingVideosCount, videoState) => entry => {
        const isVisible = entry.isIntersecting;
        const state = instance.getState?.() || '';
        const isBuffering = state === 'buffering';
        const isPlaying = state === 'playing';

        if (isVisible && isBuffering) {
            window.LN?.observable?.publish?.('pauseTimeout');
            return;
        }

        if (!isVisible) {
            if (isPlaying || isBuffering) {
                instance.pause?.();

                if (videoState && videoState.isPlayingInViewport) {
                    // eslint-disable-next-line no-param-reassign
                    videoState.isPlayingInViewport = false;
                    if (getPlayingVideosCount() === 0) {
                        window.LN?.observable?.publish?.('resumeTimeout');
                    }
                }
            }
        }
    };

export const setupVideoObserver = (
    articleElement,
    callback,
    threshold = 0.5
) => {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => callback(entry, observer));
        },
        { threshold }
    );

    observer.observe(articleElement);
};

export const isMostlyInViewport = (element, ratio = 0.5) => {
    if (!element) return false;

    const box = element.getBoundingClientRect(); // posición y tamaño del elemento
    const viewportHigh =
        window.innerHeight || document.documentElement.clientHeight;

    const visibleHeight =
        Math.min(box.bottom, viewportHigh) - Math.max(box.top, 0);

    if (visibleHeight <= 0) return false;

    return visibleHeight / box.height >= ratio; // cumple con la sensibilidad de ratio requerida = true, sino false.
};

const videosStatus = new Map();

export const setVideoStatus = mediaId =>
    videosStatus.set(mediaId, { isPlayingInViewport: false });

export const getVideoStatus = mediaId => videosStatus.get(mediaId);

export const getPlayingVideosCount = () =>
    Array.from(videosStatus.values()).reduce(
        (count, state) => count + (state.isPlayingInViewport ? 1 : 0),
        0
    );

export const handleVideoStop = (articleElement, videoState) => {
    if (
        articleElement &&
        isMostlyInViewport(articleElement) &&
        videoState.isPlayingInViewport
    ) {
        // eslint-disable-next-line no-param-reassign
        videoState.isPlayingInViewport = false;
        const activeCount = getPlayingVideosCount();

        if (activeCount === 0) {
            window.LN?.observable?.publish?.('resumeTimeout');
        }
    }
};
