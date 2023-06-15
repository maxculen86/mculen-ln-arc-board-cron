import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import getTextOfContent from './utils/summarySource/getTextOfContent';

const fetch = query => {
    const { idArticle = '' } = query;
    const filters = '&included_fields=content_elements,subtype';
    const opt = {
        uri: `${CONTENT_BASE}/content/v4/stories/?website=la-nacion-ar&_id=${idArticle}&published=false&${filters}`,
        json: true
    };
    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }

    return request(opt)
        .then(response => {
            return {
                data: getTextOfContent(response.content_elements) || '',
                subtype: response.subtype || ''
            };
        })
        .catch(error => {
            return logger.push(error, {
                source: 'summarySource',
                url: opt.uri
            });
        });
};

export default {
    fetch,
    params: {
        idArticle: 'text'
    },
    ttl: 120
};
