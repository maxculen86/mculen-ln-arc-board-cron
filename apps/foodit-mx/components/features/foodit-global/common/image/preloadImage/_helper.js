import { useContent } from 'fusion:content';

import get from '../../../../../private/common/utils/get';
import { checkForId } from '../../../../LN-10/article/common/_helper-WebApi';
import { filterImagesByDevice } from '../../../../private-global/common/utils/filterImagesByDevice';
import { getVideoData } from '../../../../private-global/common/utils/getVideoData';

import filter from '../../../../../../content/filters/foodit/home/articleFoodit';
import videoJwFilter from '../../../../../../content/filters/foodit/videoJwFilter';

import replaceBaseUrl from '../../utils/replaceBaseUrl';
import { getOpeningProps } from '../../utils/notaFooditHelper';
import fooditRules from '../../utils/fooditRules';

export const getHomeOpeningImages = (renderables = [], isAdmin = false) => {
    const {
        noteId = '',
        openingLayout = '',
        videoId
    } = getOpeningProps(renderables);
    const id = checkForId(noteId);
    const validVideoId = checkForId(videoId);

    const { openingImgConfig = 'recipeDay' } = fooditRules(openingLayout);

    const source =
        (validVideoId && 'fooditVideoSource') ||
        (id && 'fooditBaseArticleSource') ||
        null;

    const queryConfig = validVideoId
        ? {
              imageConfig: openingImgConfig,
              id: validVideoId,
              isInApertura: true
          }
        : {
              imageConfig: openingImgConfig,
              id,
              published: true,
              isInApertura: true,
              isAdmin,
              checkExclusiveAccess: false
          };

    const preloadContent = useContent({
        source,
        query: queryConfig,
        staticMode: true,
        filter: validVideoId ? videoJwFilter : filter
    });

    if (validVideoId) {
        return [{ resizedUrl: get(preloadContent, 'poster', '') }];
    }

    return get(preloadContent, 'promo_items.basic.resized_urls', []);
};

export const getPromoItemsImages = (article = {}, layout = '') => {
    const { promo_items: promoItems = {} } = article;

    const videoJw = get(promoItems, 'video_jw', null);
    const basicImage = replaceBaseUrl(get(promoItems, 'basic', {}));
    const basicImageMobile =
        layout === 'Foodit-ficha-nota' &&
        replaceBaseUrl(get(promoItems, 'storytelling_mobile', null));

    if (videoJw && layout !== 'Foodit-recipe-paywall') {
        const { posterUrl = '' } = getVideoData(videoJw);
        const posterImage = {
            resizedUrl: posterUrl,
            ...(basicImageMobile && {
                option: {
                    media_preload: '(min-width: 1024px)',
                    useFullSize: true,
                    proportion: '3:2'
                }
            })
        };

        return [
            ...filterImagesByDevice(basicImageMobile, 'mobile'),
            posterImage
        ];
    }

    if (basicImageMobile)
        return [
            ...filterImagesByDevice(basicImage, 'desktop'),
            ...filterImagesByDevice(basicImageMobile, 'mobile')
        ];

    return get(basicImage, 'resized_urls', []);
};
