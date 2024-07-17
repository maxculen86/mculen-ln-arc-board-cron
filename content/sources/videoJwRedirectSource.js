import { SITE_OTT } from 'fusion:environment';
import { replaceVideoId } from './utils/replaceVideoId';
import apiConvivenciaSource from './apiConvivenciaSource';
import Redirect from './utils/redirect';
import logger from '../../components/private/common/utils/logger';

const fetch = async (query, { cachedCall }) => {
    try {
        const { url } = query;
        const { idJw } = await cachedCall(
            'apiConvivenciaSource',
            apiConvivenciaSource.fetch,
            { query }
        );
        const newUrl = replaceVideoId(url, idJw);

        if (idJw) {
            throw new Redirect(`${SITE_OTT}${newUrl}`, 301);
        }
    } catch (error) {
        logger.push(
            error,
            {
                source: 'content/source/videoJwRedirectSource',
                sectionId
            },
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
