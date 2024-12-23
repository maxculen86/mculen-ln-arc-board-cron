import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import { enumTypeError } from '../../components/private/LN/api/common/enums/enumTypeError';
import { BackendLnError } from '../../components/private/LN/api/common/models/backendLnError';

const params = { imageId: 'text', api: 'bool' };

const fetch = ({ imageId, api }) => {
    let newImageId = imageId;
    const arcSite = 'la-nacion-ar';
    if (api) {
        const verificacion = /^https?:\/\/\w.*/gim.test(newImageId);
        if (
            (newImageId.startsWith('https:/') ||
                newImageId.startsWith('http:/')) &&
            !verificacion
        ) {
            newImageId = newImageId
                ?.replace('https:/', 'https://')
                ?.replace('http:/', 'http://');
        }
    }

    const opt = {
        uri: `${CONTENT_BASE}/signing-service/v2/sign/resizer/1?value=${encodeURIComponent(
            newImageId
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
            if (api) {
                console.warn(
                    new BackendLnError(
                        `apiSigningServiceSource - msj: ${
                            error.message
                        } - Query: ${JSON.stringify(newImageId || {})}`,
                        enumTypeError.apiSigningServiceError
                    )
                );
            }

            logger.push(
                error,
                {
                    source: 'content/source/apiSigningServiceSource',
                    newImageId
                },
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
