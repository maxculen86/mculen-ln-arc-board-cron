import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import filter from '../filters/foodit/fooditHasVideoSource';

const fetch = query => {
    const { idArticle = '' } = query;
    const filters = '&included_fields=content_elements';
    const opt = {
        uri: `${CONTENT_BASE}/content/v4/stories/?website=foodit&_id=${idArticle}&published=true&${filters}`,
        json: true
    };
    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }

    return request(opt).catch(error =>
        logger.push(error, {
            source: 'fooditHasVideo',
            url: opt.uri
        })
    );
};

export default {
    fetch,
    params: {
        idArticle: 'text'
    },
    filter,
    ttl: 120
};
