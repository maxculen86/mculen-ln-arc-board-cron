import { IS_SANDBOX, IS_DEV } from 'fusion:environment';
import request from 'request-promise-native';
import logger from '../../../../components/private/common/utils/logger';

const resolve = query => {
    const { rootPath, website, ticksCache } = query;

    const arcSite = website || 'la-nacion-ar';
    const paramsTicks = ticksCache != null ? `&ticks=${ticksCache}` : '';
    return `${rootPath}/?_website=${arcSite}&outputType=json${paramsTicks}`;
};

const fetch = async query => {
    const endpoint = {
        uri: `${resolve(query)}`,
        json: true
    };

    if (
        (IS_DEV === 'true' && IS_SANDBOX === 'true') ||
        endpoint.uri.includes('sandbox')
    ) {
        endpoint.headers = {
            Cookie: 'el_arc=2c88b3e4-500e-4629-9a0d-78a032107225'
        };
    }

    return request(endpoint)
        .then(response => {
            return response;
        })
        .catch(error => {
            // eslint-disable-next-line no-console
            console.warn(
                `Error Page Index - sources/utils/pageSource/index: ${JSON.stringify(
                    query
                )} - uri: ${JSON.stringify(endpoint.uri)} - errorMsj:${
                    error.message
                }`
            );
            logger.push(error, { source: 'servicesSource/page/index', query });
        });
};

export default {
    fetch
};
