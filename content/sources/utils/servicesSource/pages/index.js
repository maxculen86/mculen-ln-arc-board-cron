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

    if (ARC_ACCESS_TOKEN) {
        endpoint.auth = {
            bearer: ARC_ACCESS_TOKEN
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
                `servicesSource/page Error: ${JSON.stringify(
                    query
                )} - errorMsj:${error.message}`
            );
            logger.push(error, { source: 'servicesSource/page', query });
        });
};

export default {
    fetch
};
