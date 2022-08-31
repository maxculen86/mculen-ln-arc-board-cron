import React from 'react';
import { useContent } from 'fusion:content';
import filterArticle from '../../../../../content/filters/LN/nota/articleAcu';

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
                        isInApertura,
                        isAdmin
                    },
                    filter: filter[sourceType]
                })) ||
            {}
        );
    };

    return fetchSourceData();
};
export default getImage;
