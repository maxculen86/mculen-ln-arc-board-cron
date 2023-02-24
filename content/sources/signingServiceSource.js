import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';

const params = { imageId: 'text' };

const fetch = ({ imageId }) => {
    const arcSite = 'la-nacion-ar';
    const opt = {
        uri: `${CONTENT_BASE}/signing-service/v2/sign/resizer/1?value=${encodeURIComponent(
            imageId
        )}`,
        json: true,
        method: 'GET'
    };

    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }

    return request(opt)
        .then(data => data)
        .catch(error => {
            logger.push(
                error,
                { source: 'content/source/signingServiceSource', imageId },
                arcSite
            );
        });
};

export default {
    fetch,
    params,
    // 365 day ttl
    ttl: 31536000
};
