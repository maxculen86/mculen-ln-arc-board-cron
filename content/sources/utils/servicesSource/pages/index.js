import { ARC_ACCESS_TOKEN, SITE_LANACION } from 'fusion:environment';
import request from 'request-promise-native';
import logger from '../../../../../components/private/common/utils/logger';
import transform from '../../pageSource/transform';

const resolve = query => {
    const { sectionId, website, ticksCache } = query;

    const arcSite = website || 'la-nacion-ar';
    const basePath = `${SITE_LANACION}${sectionId ? `/${sectionId}` : ''}`;
    const basePath2 = `http://localhost/homepage${
        sectionId ? `/${sectionId}` : ''
    }`;

    const requestUrl = `${basePath}/?_website=${arcSite}&outputType=json&ticks=${ticksCache}`;
    console.log('RRREEEEERERERERrequestUrl');
    console.log(requestUrl);
    return requestUrl;
};

const fetch = async query => {
    const endpoint = {
        uri: `${resolve(query)}`,
        json: true
    };

    if (endpoint.uri.includes('sandbox')) {
        endpoint.headers = {
            Cookie: 'el_arc=2c88b3e4-500e-4629-9a0d-78a032107225'
        };
    }

    return request(endpoint)
        .then(response => {
            console.log('RESSSPOSSSMSMS');
            return transform(response, query);
        })
        .catch(error => {
            // eslint-disable-next-line no-console
            console.warn(
                `servicesSource/page Error: ${JSON.stringify(query)} - uri: ${
                    endpoint.uri
                } - errorMsj:${error.message}`
            );
            logger.push(error, { source: 'servicesSource/page', query });
        });
};

export default {
    fetch
};
