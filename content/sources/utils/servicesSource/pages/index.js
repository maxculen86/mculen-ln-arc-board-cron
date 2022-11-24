import { ARC_ACCESS_TOKEN, SITE_LANACION } from 'fusion:environment';
import request from 'request-promise-native';
import logger from '../../../../../components/private/common/utils/logger';
import transform from '../../pageSource/transform';

const resolve = query => {
    const { sectionId, website } = query;

    const arcSite = website || 'la-nacion-ar';
    const basePath = `${SITE_LANACION}${sectionId ? `/${sectionId}` : ''}`;
    /*const basePath = `http://arc.lanacion.com.ar/pf${
        sectionId ? `/${sectionId}` : ''
    }`;*/
    const requestUrl = `${basePath}/?_website=${arcSite}&outputType=json`;

    return requestUrl;
};

const fetch = async query => {
    const opt = {
        uri: `${resolve(query)}`,
        json: true
    };

    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }
    return request(opt)
        .then(response => {
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
    fetch,
    params: {
        sectionId: 'text',
        website: 'text'
    }
};
