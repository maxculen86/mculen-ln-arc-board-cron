import get from '../../../../private/common/utils/get';

export const filterImagesByProportion = (imageData, proportion) =>
    get(imageData, 'resized_urls', []).filter(
        img => get(img, 'option.proportion') === proportion
    );
