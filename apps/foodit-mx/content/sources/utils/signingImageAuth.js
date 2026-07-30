import get from '../../../components/private/common/utils/get';
import { isEmptyString } from '../../../components/private/common/utils/dataValidation';

export const missingPromoItemImgAuth = ({ dataPromoItem }) =>
    (get(dataPromoItem, 'basic.type') === 'image' &&
        !get(dataPromoItem, 'basic.auth.1')) ||
    (get(dataPromoItem, 'storytelling_mobile.type') === 'image' &&
        !get(dataPromoItem, 'storytelling_mobile.auth.1')) ||
    (get(dataPromoItem, 'storytelling.type') === 'video' &&
        !get(dataPromoItem, 'storytelling.promo_items.basic.auth.1')) ||
    (get(dataPromoItem, 'apertura_multimedia.type') === 'video' &&
        !get(dataPromoItem, 'apertura_multimedia.promo_items.basic.auth.1')) ||
    (get(dataPromoItem, 'basic.type') === 'video' &&
        !get(dataPromoItem, 'basic.promo_items.basic.auth.1')) ||
    (get(dataPromoItem, 'video_jw.subtype') === 'video_jw' &&
        !get(dataPromoItem, 'video_jw.auth.1'));

export const missingContentElementImgAuth = ({ dataContentElements }) => {
    if (!Array.isArray(dataContentElements)) return false;

    return dataContentElements.some(contentElement => {
        const contentElementType = get(contentElement, 'type');
        return (
            (contentElementType === 'image' &&
                !get(contentElement, 'auth.1')) ||
            (contentElementType === 'video' &&
                !get(contentElement, 'promo_items.basic.auth.1')) ||
            (contentElementType === 'gallery' &&
                missingPromoItemImgAuth({
                    dataPromoItem: get(contentElement, 'promo_items', {})
                })) ||
            (get(contentElement, 'subtype') === 'video_jw' &&
                !get(contentElement, 'auth.1')) ||
            missingContentElementImgAuth(
                get(contentElement, 'content_elements', [])
            )
        );
    });
};

export const missingCreditsImgAuth = ({ dataCredits }) => {
    if (!Array.isArray(dataCredits)) return false;

    return dataCredits.some(
        credit =>
            !isEmptyString(get(credit, 'image.url', '')) &&
            !get(credit, 'image.auth.1')
    );
};
