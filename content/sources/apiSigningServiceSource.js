import { ARC_ACCESS_TOKEN, CONTENT_BASE } from 'fusion:environment';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';
import logger from '../../components/private/common/utils/logger';
import { enumTypeError } from '../../components/private/LN/api/common/enums/enumTypeError';
import { BackendLnError } from '../../components/private/LN/api/common/models/backendLnError';

const params = { imageId: 'text', api: 'bool' };

const fetch = async ({ imageId, api }) => {
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
        method: 'GET'
    };

    if (ARC_ACCESS_TOKEN)
        opt.headers = { Authorization: `Bearer ${ARC_ACCESS_TOKEN}` };

    const uri = `${CONTENT_BASE}/signing-service/v2/sign/resizer/1?value=${encodeURIComponent(
        newImageId
    )}`;

    try {
        const response = await global.fetch(uri, opt);
        handleHttpError(response);
        return response.json();
    } catch (error) {
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
        return null;
    }
};

export default {
    fetch,
    params,
    // 365 day ttl
    ttl: 31536000
};
