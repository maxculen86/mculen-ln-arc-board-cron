import React from 'react';
import { useContent } from 'fusion:content';
import { LinkImagePreload } from '../common/utils/mediaHelper';
import setArticleQueryAcu from '../common/utils/setArticleQueryAcu';
import get from '../../common/utils/get';
import replaceUrlResizerToWWW from '../../../../content/sources/utils/replaceUrlResizerToWWW';
import filter from '../../../../content/filters/LN/acumulado/articlePreload';

function ImagePreloadlAcu({
    arcSite,
    accumulated,
    nodeType,
    collectionId = '',
    imageConfig = 'boxArticles',
    sectionsIds = ''
}) {
    const typesOfQuery = sectionsIds
        ? { sectionsIds }
        : setArticleQueryAcu(nodeType, accumulated);

    const imagePreloadArticlesList = useContent({
        source:
            typesOfQuery?.sectionsIds ||
            typesOfQuery?.sectionId ||
            typesOfQuery?.tagId
                ? 'lnAcuSource'
                : 'collectionsSource',
        query: {
            ...typesOfQuery,
            ...(collectionId && { id: collectionId }),
            website: arcSite || 'la-nacion-ar',
            imageConfig,
            size: 1,
            sourceOrigin: sectionsIds ? 'composer' : ''
        },
        filter,
        staticMode: true
    });

    const [firstArticle] = get(
        imagePreloadArticlesList,
        'content_elements',
        []
    );

    const basic = get(firstArticle, 'promo_items.basic', {});
    const promoItemsWWW = replaceUrlResizerToWWW(basic) || {};
    const resizedUrls = get(promoItemsWWW, 'resized_urls', []);

    return <LinkImagePreload resizedUrls={resizedUrls} />;
}

export default ImagePreloadlAcu;
