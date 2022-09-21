import React from 'react';
import { useContent } from 'fusion:content';
import filterArticle from '../../../../../content/filters/LN/nota/articleAcu';
import isSSR from '../../../LN/common/utils/isSSR';

const conditionallyCallSource = (id, sourceType, isHideImage) =>
    (id && sourceType && isHideImage === false && id.trim() && sourceType) ||
    null;

const getImage = ({
    id = '',
    sourceType = '',
    imageConfig = '',
    isHideImage = true,
    isInApertura,
    isAdmin
}) => {
    const filter = {
        relatedImageSource: '',
        articleSourceNota: filterArticle
    };

    const fetchSourceData = () => {
        return (
            useContent({
                source: conditionallyCallSource(id, sourceType, isHideImage),
                query: {
                    id: id.trim(),
                    published: true,
                    imageConfig,
                    isInApertura,
                    isAdmin
                },
                filter: filter[sourceType],
                staticMode: isSSR()
            }) || {}
        );
    };

    return fetchSourceData();
};
export default getImage;
