import { SITE_LANACION } from 'fusion:environment';
import pages from './utils/servicesSource/pages';
import get from '../../components/private/common/utils/get';
import home from '../../components/private/LN/api/v1/global/home';
import transform from './utils/servicesSource/pages/transform';

const fetch = async (query, { cachedCall } = {}) => {
    let queryParams = {};
    try {
        let ticksCache = get(query, 'ticks', null);
        ticksCache = ticksCache === null ? '' : ticksCache.replace('/', '');
        const website = get(query, 'website', null);

        queryParams = {
            rootPath: 'http://172.17.0.1/homepage8', //SITE_LANACION,
            ticksCache,
            website
        };
        if (!SITE_LANACION) {
            throw new Error('Variable SITE_LANACION missing');
        }
        const resultPage = await cachedCall('ApiPageHome', pages.fetch, {
            query: queryParams,
            ttl: 120
        });
        //return resultPage;
        const resultPageTransform = await transform(resultPage, queryParams);
       // return resultPageTransform;
        const resultHome = home(resultPageTransform);
        return Array.isArray(resultHome) ? resultHome[0] : {};
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
