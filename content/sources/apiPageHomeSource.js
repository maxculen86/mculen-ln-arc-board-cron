import { SITE_LANACION } from 'fusion:environment';
import get from '../../components/private/common/utils/get';
import pages from './utils/servicesSource/pages';

const fetch = async (query, { cachedCall } = {}) => {
    let queryParams = {};
    try {
        let ticksCache = get(query, 'ticks', null);
        ticksCache = ticksCache === null ? '' : ticksCache.replace('/', '');
        const website = get(query, 'website', null);

        queryParams = {
            rootPath: SITE_LANACION,
            ticksCache,
            website
        };

        if (!SITE_LANACION) {
            throw new Error('Variable SITE_LANACION missing');
        }
        return await cachedCall('ApiPageHome', pages.fetch, {
            query: queryParams,
            ttl: 120
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
            `Error content/apiPageHomeSource : ${JSON.stringify(
                queryParams
            )} - errorMsj:${error.message}`
        );
        return null;
    }
};

export default {
    fetch,
    params: {
        website: 'text',
        ticks: 'text'
    },
    ttl: 120
};
