/* eslint-disable prefer-destructuring */
import { LANACION_SERVICES_URL } from 'fusion:environment';
import getProperties from 'fusion:properties';
import logger from '../../components/private/common/utils/logger';
import get from '../../components/private/common/utils/get';
import getImageResized from '../../components/private/common/utils/getImageResized';
import transformISODate from '../../components/private/common/utils/transformISODate';
import getRequest from './utils/getRequest';

const resolve = query => {
    const { slug = '' } = query;
    return `${LANACION_SERVICES_URL}/api/v1/tags/${slug}`;
};

const fetch = query => {
    const { id = '', uri = '', 'arc-site': arcSite = 'la-nacion-ar' } = query;
    return getRequest(resolve(query))
        .then(response => response)
        .catch(error => {
            logger.push(error, { source: 'wikiTagSource', url: uri }, arcSite);
        });
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
    resolve,
    params: {
        slug: 'text',
        imageId: 'text',
        imageConfig: 'text'
    },
    ttl: 120
};
