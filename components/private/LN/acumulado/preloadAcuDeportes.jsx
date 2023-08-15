/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { LinkImagePreload } from '../common/utils/mediaHelper';
import get from '../../common/utils/get';
import replaceUrlResizerToWWW from '../../../../content/sources/utils/replaceUrlResizerToWWW';
import filter from '../../../../content/filters/LN/acumulado/articlePreload';
import useGetArticlesToPreload from '../common/hooks/useGetArticlesToPreload';

const PreloadAcuDeportes = ({
    arcSite,
    imageConfig = '',
    articleId = '',
    imageId = '',
    collectionId = '',
    initialPosition = 0,
    isFocal = false,
    isLoadWithPicture
}) => {
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

    return (
        <LinkImagePreload
            // TODO: Eliminar esta prop cuando se implemente la carga por picture en todo el sitio.
            isLoadWithPicture={isLoadWithPicture}
            resizedUrls={resizedUrls}
        />
    );
};

PreloadAcuDeportes.propTypes = {
    arcSite: PropTypes.string.isRequired,
    articleId: PropTypes.string,
    imageId: PropTypes.string,
    collectionId: PropTypes.string,
    isFocal: PropTypes.bool,
    initialPosition: PropTypes.number,
    imageConfig: PropTypes.string,
    isLoadWithPicture: PropTypes.bool
};

export default PreloadAcuDeportes;
