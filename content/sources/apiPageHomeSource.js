import { SITE_LANACION } from 'fusion:environment';
import get from '../../components/private/common/utils/get';
import pages from './utils/servicesSource/pages';

const fetch = async (query, { cachedCall } = {}) => {
    try {
        const ticksCache = get(query, 'ticks', null)?.replace('/', '');
        const queryParams = {
            rootPath: SITE_LANACION,
            ticksCache,
            website: get(query, 'website', null)
        };
        return await cachedCall('ApiPageHome', pages.fetch, {
            query: queryParams,
            ttl: 120
        });
        //return await pages.fetch(queryParams);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error content/apiPageHomeSource : ${JSON.stringify(
                query
            )} - errorMsj:${error.message}`
        );
        throw new Error(error);
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
