import get from '../../../get';
import { FOTOAL100, STORYTELLING } from '../../../subtypes/subtypeHelper';
import { replaceAllUrlsResizerArray } from '../../../../../LN/common/utils/mediaHelper';
import { getImageData } from '../../../getApertura';
import { transformImages } from '../../../../videoPlayerJw/utils/helperJw';
import setMediaCondition from '../../../../../../../properties/sites/utils/setMediaCondition';

const getImageListStorytelling = (imageData, proportion) => {
    return replaceAllUrlsResizerArray(getImageData(imageData, proportion));
};

const getImagesList = ({ promoItems, basicDefault }) => {
    if (Boolean(get(promoItems, 'storytelling', null))) {
        return getImageListStorytelling(
            get(promoItems, 'storytelling_mobile', []),
            '2:3'
        );
    }

    return [
        ...getImageListStorytelling(basicDefault, '3:2'),
        ...getImageListStorytelling(
            get(promoItems, 'storytelling_mobile', []),
            '2:3'
        )
    ];
};

export const getResizedUrls = (subtype, promoItems, basicDefault) => {
    const isVideoType =
        get(promoItems, 'video_jw.subtype', false) === 'video_jw';

    if (isVideoType) {
        const aperturaMultimedia = get(
            promoItems,
            'video_jw.embed.config.videoJw.playlist',
            {}
        );
        const aperturaSrcImages =
            aperturaMultimedia.length > 0 ? aperturaMultimedia[0] : {};
        const srcImages = get(aperturaSrcImages, 'images', []);

        let imagesJwPlayer = transformImages(srcImages, subtype);
        imagesJwPlayer = fillMaxWidth(imagesJwPlayer);

        const preloadJwPlayer = imagesJwPlayer.map(
            ({ minWidth = '', maxWidth = '', srcSet = '' }) => ({
                option: {
                    media_preload: setMediaCondition({ minWidth, maxWidth }),
                    minScreenWidth: minWidth || 0,
                    width: minWidth || 0
                },
                resizedUrl: srcSet
            })
        );

        return preloadJwPlayer;
    }

    if (
        (subtype === STORYTELLING || subtype === FOTOAL100) &&
        get(promoItems, 'storytelling_mobile')
    ) {
        return getImagesList({
            promoItems,
            basicDefault
        });
    }

    return get(basicDefault, 'resized_urls', []);
};

export const fillMaxWidth = images => {
    return images.reduceRight((acc, image, index, array) => {
        if (!image.maxWidth && index < array.length - 1) {
            image.maxWidth = array[index + 1].minWidth - 1;
        }
        acc.unshift(image);
        return acc;
    }, []);
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
