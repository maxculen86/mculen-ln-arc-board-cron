import React from 'react';
import PropTypes from 'prop-types';
import { LinkImagePreload } from '../common/utils/mediaHelper';
import useGetArticlesFromAcumSource from '../common/hooks/useGetArticlesFromAcumSource';
import setArticleQueryAcu from '../common/utils/setArticleQueryAcu';
import get from '../../common/utils/get';
import replaceUrlResizerToWWW from '../../../../content/sources/utils/replaceUrlResizerToWWW';
import filter from '../../../../content/filters/LN/acumulado/articlePreload';

const ImagePreloadlAcu = ({ arcSite, accumulated, nodeType }) => {
    const typesOfQuery = setArticleQueryAcu(nodeType, accumulated);

    const searchArgs = {
        typesOfQuery,
        filter,
        imageConfig: 'boxArticles',
        size: 1,
        sourceOrigin: '',
        excludeSectionId: false,
        type: '',
        shouldNotFilter: false,
        website: arcSite || 'la-nacion-ar',
        promoItemsOnly: false,
        staticMode: true
    };

    const [firstArticle] =
        useGetArticlesFromAcumSource(...Object.values(searchArgs)) || [];

    const basic = get(firstArticle, 'promo_items.basic', {});
    const promoItemsWWW = replaceUrlResizerToWWW(basic) || {};
    const resizedUrls = get(promoItemsWWW, 'resized_urls', []);

    return <LinkImagePreload resizedUrls={resizedUrls} />;
};

ImagePreloadlAcu.propTypes = {
    arcSite: PropTypes.string.isRequired,
    accumulated: PropTypes.shape({
        id: PropTypes.string,
        canonicalUrl: PropTypes.string,
        name: PropTypes.string
    }).isRequired,
    nodeType: PropTypes.string.isRequired
};

export default ImagePreloadlAcu;
