import { SITE_LANACION } from 'fusion:environment';
import pages from './utils/servicesSource/pages';
import get from '../../components/private/common/utils/get';
import home from '../../components/private/LN/api/v1/global/home';
import transform from './utils/servicesSource/pages/transform';

const fetch = async (query, { cachedCall } = {}) => {
    let queryParams = {};
    const aliasPages = {
        home: '',
        sports: '/deportes'
    };
    try {
        let ticksCache = get(query, 'ticks', null);
        const alias = get(query, 'namePage', 'home');
        ticksCache = ticksCache === null ? '' : ticksCache.replace('/', '');
        const website = get(query, 'website', null);
        if (!SITE_LANACION) {
            throw new Error('Variable SITE_LANACION missing');
        }
        queryParams = {
            rootPath: `http://172.17.0.1${aliasPages[alias]}`, //`SITE_LANACION${aliasPages[alias]}`,
            ticksCache,
            website
        };

        const resultPage = await cachedCall(
            `ApiPageHome${alias}`,
            pages.fetch,
            {
                query: queryParams,
                ttl: 120
            }
        );
        // Para revisar la data cruda que viene del Layout
        // return resultPage;

        const resultPageTransform = await transform(resultPage, queryParams);
        // Para revisar la data formateada con la informacion de todas la secciones
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
        namePage: 'text',
        ticks: 'text'
    },
    ttl: 120
};
