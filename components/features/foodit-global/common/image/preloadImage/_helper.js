import { useContent } from 'fusion:content';

import get from '../../../../../private/common/utils/get';
import { checkForId } from '../../../../LN-10/article/common/_helper-WebApi.js';
import { filterImagesByDevice } from '../../../../private-global/common/utils/filterImagesByDevice.js';
import { getVideoData } from '../../../../private-global/common/utils/getVideoData.js';

import filter from '../../../../../../content/filters/foodit/home/articleFoodit.js';
import replaceBaseUrl from '../../utils/replaceBaseUrl.js';
import { getOpeningProps } from '../../utils/notaFooditHelper.js';
import fooditRules from '../../utils/fooditRules.js';

export const getHomeOpeningImages = (renderables = [], isAdmin = false) => {
    const { noteId = '', openingLayout = '' } = getOpeningProps(renderables);
    const id = checkForId(noteId);

    const { openingImgConfig = 'recipeDay' } = fooditRules(openingLayout);

    const { promo_items = {} } =
        useContent({
            source: id ? 'fooditBaseArticleSource' : null,
            query: {
                id,
                published: true,
                website: 'foodit',
                isInApertura: true,
                isAdmin,
                imageConfig: openingImgConfig,
                checkExclusiveAccess: false
            },
            staticMode: true,
            filter
        }) || {};

    return get(promo_items, 'basic.resized_urls', []);
};

export const getPromoItemsImages = (article = {}, layout = '') => {
    const { promo_items } = article;

    const videoJw = get(promo_items, 'video_jw', null);
    const basicImage = replaceBaseUrl(get(promo_items, 'basic', {}));
    const basicImageMobile =
        layout === 'Foodit-ficha-nota' &&
        replaceBaseUrl(get(promo_items, 'storytelling_mobile', null));

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
