import { useContent } from 'fusion:content';
import {
    getMediaData,
    validateMedia,
    getTypeOfMedia,
    getImageIdValidations
} from '../_helper';
import { checkForId } from '../common/_helper-WebApi';
import videoFilterLN10 from '../../../../../content/filters/LN/home/LN10/videoFilterLN10';
import isSSR from '../../../../private/LN/common/utils/isSSR';
import { getImage } from '../../../../private/LN/common/utils/articuloHelper';
import get from '../../../../private/common/utils/get';

const useArticleMedia = ({
    editorData,
    chainData,
    appData,
    transformedArticle,
    onlyOneApeturaValidateForWWW
}) => {
    const videoBackground =
        useContent({
            source:
                checkForId(get(editorData, 'videoId', '')) &&
                !get(editorData, 'isHtml', false)
                    ? 'videosJwSource'
                    : null,
            staticMode: isSSR(),
            query: {
                id: checkForId(get(editorData, 'videoId', '')),
                website: 'la-nacion-ar',
                imageConfig: get(chainData, 'imageConfig', ''),
                isInApertura: onlyOneApeturaValidateForWWW,
                isAdmin: get(appData, 'isAdmin', false),
                arcSite: get(appData, 'arcSite', '')
            },
            filter: videoFilterLN10
        }) || null;

    const resolveImageId = getImageIdValidations(
        get(editorData, 'isHtml', false),
        get(editorData, 'isVideo', false),
        get(editorData, 'imageId', '')
    );

    const image = getImage({
        imageId: resolveImageId,
        imageConfig: get(chainData, 'imageConfig', ''),
        id: get(editorData, 'id', ''),
        onlyOneApeturaValidateForWWW,
        isAdmin: get(appData, 'isAdmin', false)
    });

    const promoItems = image && image.promo_items;

    const withMedia = validateMedia(
        editorData,
        get(chainData, 'config', {}),
        transformedArticle
    );

    const mediaData = getMediaData({
        article: transformedArticle,
        video: videoBackground,
        customFields: editorData,
        image,
        layout: get(chainData, 'layout', ''),
        renderables: get(appData, 'renderables', []),
        config: get(chainData, 'config', {}),
        isAdmin: get(appData, 'isAdmin', false),
        isHome: get(appData, 'isHome', false),
        isLoadWithPicture: get(chainData, 'config.isLoadWithPicture', false),
        isInApertura: onlyOneApeturaValidateForWWW
    });

    const typeOfMedia = getTypeOfMedia(editorData);

    return {
        withMedia,
        mediaData,
        typeOfMedia,
        image,
        promoItems,
        videoBackground
    };
};

export default useArticleMedia;
