import get from '../../../../private/common/utils/get';

export const filterImagesByDevice = (imageData, device) =>
    get(imageData, 'resized_urls', []).filter(
        img => get(img, 'option.device', '') === device
    );
