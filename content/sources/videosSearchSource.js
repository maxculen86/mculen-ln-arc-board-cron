import { RESIZER_KEY, RESIZER_URL } from 'fusion:environment';
import { createResizer } from '../../components/private/common/utils/image/resizer';

const resolve = key => {
    const { query, published, website } = key;
    if (!query || !website)
        throw new Error(
            'Debe definir website y query para realizar la consulta'
        );

    let qryPublished;
    if (published) qryPublished = '/published';
    else qryPublished = '';

    return `/content/v4/search${qryPublished}?website=${website}&${query}`;
};

const transform = data => {
    const transformedData = data;
    const { content_elements: contentElements } = data || {};

    transformedData.content_elements =
        contentElements &&
        contentElements.map(elem => {
            return {
                ...elem,
                resized_url: createResizer(RESIZER_KEY, RESIZER_URL).resizeUrl(
                    elem.promo_image.url,
                    289,
                    163,
                    {
                        width: 289,
                        height: 163,
                        media: '(min-width: 320px)',
                        type: 'image'
                    }
                )
            };
        });
    return transformedData;
};

export default {
    resolve,
    transform,
    schemaName: 'videos-schema',
    params: {
        query: 'text'
    },
    ttl: 600
};
