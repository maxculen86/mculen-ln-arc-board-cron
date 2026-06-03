import React from 'react';
import { LinkImagePreload } from '../common/utils/mediaHelper';
import get from '../../common/utils/get';
import replaceUrlResizerToWWW from '../../../../content/sources/utils/replaceUrlResizerToWWW';
import filter from '../../../../content/filters/LN/acumulado/articlePreload';
import useGetArticlesToPreload from '../common/hooks/useGetArticlesToPreload';

function PreloadAcuDeportes({
    arcSite,
    imageConfig = '',
    articleId = '',
    imageId = '',
    collectionId = '',
    initialPosition = 0,
    isFocal = false
}) {
    const [firstArticle] =
        useGetArticlesToPreload({
            website: arcSite || 'la-nacion-ar',
            imageConfig,
            articleId,
            imageId,
            collectionId,
            initialPosition,
            isFocal,
            filter,
            size: 1,
            staticMode: true
        }) || [];

    const basic = get(firstArticle, 'promo_items.basic', {});
    const promoItemsWWW = replaceUrlResizerToWWW(basic) || {};
    const resizedUrls = get(promoItemsWWW, 'resized_urls', []);

    return <LinkImagePreload resizedUrls={resizedUrls} />;
}

export default PreloadAcuDeportes;
