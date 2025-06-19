import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';

export const validateVideoPlayer = ({ video, videoId }) => {
    const rules = [
        {
            validation: !videoId,
            message: 'Advertencia. El campo Video es obligatorio'
        },
        {
            validation: videoId && video === null,
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
    (instance, metaRefreshActive) => entry => {
        const isVisible = entry.isIntersecting;
        const state = instance.getState?.() || '';
        const isBuffering = state === 'buffering';

        if (isVisible && metaRefreshActive.active && isBuffering) {
            window.LN?.observable?.publish?.('clearTimeout');
            // eslint-disable-next-line no-param-reassign
            metaRefreshActive.active = false;

            return;
        }

        if (!isVisible && !metaRefreshActive.active) {
            if (state === 'playing' || isBuffering) {
                instance.pause?.();
            }
            window.LN?.observable?.publish?.('retriggerTimeout');
            // eslint-disable-next-line no-param-reassign
            metaRefreshActive.active = true;
        }
    };

export const setupVideoObserver = (
    articleElement,
    callback,
    threshold = 0.5
) => {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => callback(entry));
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
