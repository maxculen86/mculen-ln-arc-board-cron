import { SITE_OTT } from 'fusion:environment';
import { replaceVideoId } from './utils/replaceVideoId';
import apiConvivenciaSource from './apiConvivenciaSource';
import Redirect from './utils/redirect';

// TODO: ver forma de implementar un logger/trycatch, se hicieron pruebas y da error
const fetch = async (query, { cachedCall }) => {
    const { url } = query;
    const { idJw } = await cachedCall(
        'apiConvivenciaSource',
        apiConvivenciaSource.fetch,
        {
            query
        }
    );
    const newUrl = replaceVideoId(url, idJw);

    if (idJw) {
        throw new Redirect(`${SITE_OTT}${newUrl}`, 301);
    }
};

export default {
    fetch,
    params: {
        url: 'text'
    },
    ttl: 900
};
