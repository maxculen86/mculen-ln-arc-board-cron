import { SITE_OTT } from 'fusion:environment';
import { replaceVideoId } from './utils/replaceVideoId';
import { fetch as apiConvivenciaSourceFetch } from './apiConvivenciaSource';
import Redirect from './utils/redirect';
import logger from '../../components/private/common/utils/logger';
import NotFoundError from './utils/notFoundError';
import { addForwardSlash } from '../../components/private/LN/common/utils/addForwardSlash';

const fetch = async (query, { cachedCall }) => {
    const { url, 'arc-site': arcSite } = query;

    try {
        const { idJw } = await cachedCall(
            'apiConvivenciaSource',
            apiConvivenciaSourceFetch,
            { query }
        );

        if (idJw) {
            const newPath = replaceVideoId(url, idJw);

            if (url !== newPath) {
                const newUrl = addForwardSlash(`${SITE_OTT}${newPath}`);
                throw new Redirect(newUrl, 301);
            }
        }

        throw new NotFoundError(
            `The video with URL: ${addForwardSlash(`${SITE_OTT}${url}`)} does not have an associated ID in JW`
        );
    } catch (error) {
        const { statusCode } = error || {};
        if (statusCode === 301) {
            throw error;
        }

        return logger.push(
            error,
            { source: 'content/source/videoJwRedirectSource', url },
            arcSite
        );
    }
};

export default {
    fetch,
    params: {
        url: 'text'
    },
    ttl: 900
};
