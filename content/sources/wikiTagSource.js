/* eslint-disable prefer-destructuring */
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import getProperties from 'fusion:properties';
import logger from '../../components/private/common/utils/logger';
import wikiTypes from './utils/servicesSource/wiki/_config';
import get from '../../components/private/common/utils/get';
import getImageResized from '../../components/private/common/utils/getImageResized';
import transformISODate from '../../components/private/common/utils/transformISODate';

const resolve = query => {
    const { slug = '' } = query;

    return '';
};

const fetch = query => {
    const { id = '', uri = '', slug = '', type = '' } = query;

    // return getRequest(resolve(query))
    //     .then(response => response)
    //     .catch(error => {
    //         logger.push(error, { source: 'wikiTagSource', url: uri }, arcSite);
    //     });

    return {
        ...wikiTypes[type]
    };
};

const transform = (data, siteProps) => {
    const {
        imageConfig = '',
        'arc-site': arcSite = 'la-nacion-ar'
    } = siteProps;
    const { image = {}, schemas_info: schemasInfo = {} } = data;
    const { width = '', height = '', url = '' } = image;

    const properties = getProperties(arcSite);
    const imageSizesDefault = get(properties, `imageConfig.resize.default`, []);

    const imageSizes = get(
        properties,
        `imageConfig.resize.${imageConfig}.promo_items.sizes`,
        imageSizesDefault
    );

    const transformedImage = getImageResized(url, width, height, imageSizes);

    image.resizedUrls = transformedImage !== [] ? transformedImage : [];
    return {
        ...data,
        schemas_info: {
            ...data.schemas_info,
            ...(schemasInfo.birth_date && {
                birth_date: transformISODate(
                    schemasInfo.birth_date,
                    'yyyy/mm/dd'
                )
            }),
            ...(schemasInfo.founding_date && {
                founding_date: transformISODate(
                    schemasInfo.founding_date,
                    'yyyy/mm/dd'
                )
            })
        }
    };
};

export default {
    fetch,
    transform,
    params: {
        type: 'text',
        slug: 'text',
        imageId: 'text',
        imageConfig: 'text'
    },
    ttl: 120
};
