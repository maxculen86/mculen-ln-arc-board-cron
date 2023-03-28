import get from '../../../get';
import { STORYTELLING } from '../../../subtypes/subtypeHelper';
import { replaceAllUrlsResizerArray } from '../../../../../LN/common/utils/mediaHelper';

export const getResizedUrls = (subtype, promoItems, basicDefault) => {
    const isVideoType =
        get(promoItems, 'apertura_multimedia.type', false) === 'video';

    if (isVideoType) {
        const aperturaMultimedia = get(promoItems, 'apertura_multimedia', {});

        return replaceAllUrlsResizerArray(
            get(aperturaMultimedia, 'promo_items.basic.resized_urls', [])
        );
    }

    if (subtype === STORYTELLING) {
        return replaceAllUrlsResizerArray(
            get(promoItems, 'storytelling_mobile.resized_urls', [])
        );
    }

    return get(basicDefault, 'resized_urls', []);
};

export const getcustomFieldsData = fieldsData => {
    return {
        isHideImage: get(fieldsData, 'props.customFields.hideImage', false),
        imageID: get(fieldsData, 'props.customFields.imageId', '').trim(),
        noteID: get(fieldsData, 'props.customFields.noteId', '').trim(),
        videoID: get(fieldsData, 'props.customFields.video', '')
    };
};

export const getPromoItems = items => {
    return get(items, 'promo_items.basic.resized_urls', []).map(elem => {
        return {
            resizedUrl: get(elem, 'resizedUrl', ''),
            media: get(elem, 'option.media_preload', ''),
            // TODO: Evaluar no pasar Media
            option: elem.option
        };
    });
};

export const checkForId = id => (id && id.trim() ? id : '');
