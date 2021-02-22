/* eslint-disable camelcase */
import React from 'react';
import { useContent } from 'fusion:content';
import filter from '../../../../../content/filters/LN/acumulado/promoItemsRelatedImage';

const addRelatedImage = article => {
    const id =
        article?.related_content?.basic?.find(
            item => item?.referent?.type === 'image'
        )?._id || '';

    const withoutPromoItems =
        !article?.promo_items?.basic ||
        article?.promo_items?.basic.type !== 'image';

    const imageData =
        id &&
        withoutPromoItems &&
        useContent({
            source: 'relatedImageSource',
            query: {
                id,
                subtype: article?.subtype,
                imageConfig: 'm'
            },
            filter
        });

    const a =
        (imageData && {
            ...article,
            promo_items: { ...imageData?.promo_items }
        }) ||
        article;

    id && withoutPromoItems && imageData && console.log('a', a);
    return a;
};

export default addRelatedImage;
