import get from '../../../get';
import { FOTOAL100, STORYTELLING } from '../../../subtypes/subtypeHelper';
import { replaceAllUrlsResizerArray } from '../../../../../LN/common/utils/mediaHelper';
import { getImageData } from '../../../getApertura';

const getImageListStorytelling = (imageData, proportion) => {
    return replaceAllUrlsResizerArray(getImageData(imageData, proportion));
};

export const getResizedUrls = (subtype, promoItems, basicDefault) => {
    const isVideoType =
        get(promoItems, 'apertura_multimedia.type', false) === 'video';

    if (isVideoType) {
        const aperturaMultimedia = get(promoItems, 'apertura_multimedia', {});

        return replaceAllUrlsResizerArray(
            get(aperturaMultimedia, 'promo_items.basic.resized_urls', [])
        );
    }

    if (
        (subtype === STORYTELLING || subtype === FOTOAL100) &&
        get(promoItems, 'storytelling_mobile')
    ) {
        return [
            ...getImageListStorytelling(basicDefault, '3:2'),
            ...getImageListStorytelling(
                get(promoItems, 'storytelling_mobile', []),
                '2:3'
            )
        ];
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
