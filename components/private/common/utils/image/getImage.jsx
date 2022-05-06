import React from 'react';
import { useContent } from 'fusion:content';
import filterArticle from '../../../../../content/filters/LN/nota/articleAcu';

const getImage = (
    id = '',
    sourceType = '',
    imageConfig = '',
    isHideImage = true,
    isInApertura
) => {
    const filter = {
        relatedImageSource: '',
        articleSourceNota: filterArticle
    };

    const fetchSourceData = () => {
        return (
            (id &&
                sourceType &&
                isHideImage === false &&
                id.trim() &&
                useContent({
                    source: sourceType,
                    query: {
                        id: id.trim(),
                        published: true,
                        imageConfig,
                        isInApertura
                    },
                    filter: filter[sourceType]
                })) ||
            {}
        );
    };

    return fetchSourceData();
};
export default getImage;
