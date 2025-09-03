import get from '../../../get';
import { FOTOAL100, STORYTELLING } from '../../../subtypes/subtypeHelper';
import { replaceAllUrlsResizerArray } from '../../../../../LN/common/utils/mediaHelper';
import { getImageData } from '../../../getApertura';
import { transformImages } from '../../../../videoPlayerJw/utils/helperJw';
import setMediaCondition from '../../../../../../../properties/sites/utils/setMediaCondition';
import replaceUrlResizerToWWW from '../../../../../../../content/sources/utils/replaceUrlResizerToWWW';

const getImageListStorytelling = (imageData, proportion) =>
    replaceAllUrlsResizerArray(getImageData(imageData, proportion));

const getImagesList = ({ promoItems, basicDefault }) => {
    if (get(promoItems, 'storytelling', null)) {
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

export const fillMaxWidth = images =>
    images.reduceRight((acc, image, index, array) => {
        const imageAux = { ...image };
        if (!image.maxWidth && index < array.length - 1) {
            imageAux.maxWidth = array[index + 1].minWidth - 1;
        }
        acc.unshift(imageAux);
        return acc;
    }, []);

export const getResizedUrls = (subtype, promoItems, basicDefault) => {
    const propertyVideoJw = get(promoItems, 'apertura_multimedia', null)
        ? 'apertura_multimedia'
        : 'video_jw';
    const isVideoType =
        get(promoItems, `${propertyVideoJw}.subtype`, false) === 'video_jw';

    if (isVideoType) {
        const aperturaMultimedia = get(
            promoItems,
            `${propertyVideoJw}.embed.config.videoJw.playlist`,
            {}
        );
        const aperturaSrcImages =
            aperturaMultimedia.length > 0 ? aperturaMultimedia[0] : {};
        const srcImages = get(aperturaSrcImages, 'images', []);

        let imagesJwPlayer = transformImages(srcImages, subtype);
        imagesJwPlayer = fillMaxWidth(imagesJwPlayer);

        return imagesJwPlayer.map(
            ({ minWidth = '', maxWidth = '', srcSet = '' }) => ({
                option: {
                    media_preload: setMediaCondition({ minWidth, maxWidth }),
                    minScreenWidth: minWidth || 0,
                    width: minWidth || 0
                },
                resizedUrl: srcSet
            })
        );
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

export const getWWWResizedUrls = (promoItems = {}) => {
    const promoItemsBasic = get(promoItems, 'basic', {});
    const basicWithWWW = replaceUrlResizerToWWW(promoItemsBasic);
    return get(basicWithWWW, 'resized_urls', []);
};

export const getResizerUrlJw = promoItems => {
    const resizedUrls = getWWWResizedUrls(promoItems);

    const imagesJwPlayer = fillMaxWidth(resizedUrls);

    return imagesJwPlayer.map(imageJw => {
        const minWidth = get(imageJw, 'option.minScreenWidth', 0);
        const maxWidth = get(imageJw, 'option.maxScreenWidth', 0);
        const width = get(imageJw, 'option.width', 0);

        const mediaPreload =
            get(imageJw, 'option.media_preload', '') ||
            setMediaCondition({ minWidth, maxWidth });

        return {
            option: {
                media_preload: mediaPreload,
                minScreenWidth: minWidth,
                maxScreenWidth: maxWidth,
                width
            },
            resizedUrl: get(imageJw, 'resizedUrl', '')
        };
    });
};

export const getcustomFieldsData = fieldsData => ({
    isHideImage: get(fieldsData, 'props.customFields.hideImage', false),
    imageID: get(fieldsData, 'props.customFields.imageId', '').trim(),
    noteID: get(fieldsData, 'props.customFields.noteId', '').trim(),
    videoID: get(fieldsData, 'props.customFields.video', '')
});

export const getPromoItems = items =>
    get(items, 'promo_items.basic.resized_urls', []).map(elem => ({
        resizedUrl: get(elem, 'resizedUrl', ''),
        media: get(elem, 'option.media_preload', ''),
        // TODO: Evaluar no pasar Media
        option: elem.option
    }));

export const checkForId = id => (id && id.trim() ? id : '');
