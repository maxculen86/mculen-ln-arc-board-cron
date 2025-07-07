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
