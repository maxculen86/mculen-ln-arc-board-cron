import { SITE_LANACION } from 'fusion:environment';
import pages from './utils/pageSource/index';
import get from '../../components/private/common/utils/get';
import transformv1 from './utils/pageSource/pageHome/v1/mobile/transform';
import transformv2 from './utils/pageSource/pageHome/v2/mobile/transform';
import transformBitacora from './utils/pageSource/pageHome/v1/bitacora/transform';
import homev1 from '../../components/private/LN/api/v1/mobile/home';
import homev2 from '../../components/private/LN/api/v2/mobile/home';

// Run with url http://172.17.0.1/api/mobile/v1/home/1/?_website=la-nacion-ar&outputType=json
const fetch = async (query, { cachedCall } = {}) => {
    let queryParams = {};
    const aliasPages = {
        home: '/homepage-LN10',
        homeLN: '/homepage',
        sports: '/deportes',
        bitacora: '/bitacora'
    };

    const pageTransform = {
        mobile: {
            1: transformv1,
            2: transformv2
        },
        bitacora: {
            1: transformBitacora
        }
    };

    const homeTransform = {
        1: homev1,
        2: homev2
    };

    try {
        let ticksCache = get(query, 'ticks', null);
        const version = get(query, 'versionUri', 1);
        const alias = get(query, 'namePage', 'home');
        const aliasPage =
            aliasPages[alias] == null ? '/'.concat(alias) : aliasPages[alias];
        ticksCache = ticksCache === null ? '' : ticksCache.replace('/', '');
        const prefixTicksCache =
            ticksCache === '' ? '' : '_'.concat(ticksCache);
        const keyCachedCall = `ApiPageHome${alias}`.concat(prefixTicksCache);
        const website = get(query, 'website', null);
        if (!SITE_LANACION) {
            throw new Error('Variable SITE_LANACION missing');
        }
        // Para asegurarse la prueba local colocar en rootPath:
        // `http://172.17.0.1${aliasPages[alias]}` o en el .env SITE_LANACION=http://172.17.0.1

        queryParams = {
            rootPath: `${SITE_LANACION}${aliasPage}`,
            ticksCache,
            website,
            isPage: true
        };

        const resultPage = await cachedCall(keyCachedCall, pages.fetch, {
            query: queryParams,
            ttl: 120
        });
        if (!resultPage) {
            throw new Error('Not found page');
        }

        const { information } = resultPage;
        queryParams.information = information;
        // Para revisar la data transformada que viene del Layout
        // return resultPage;

        const resultPageTransform = await pageTransform[version](
            resultPage,
            queryParams
        );
        // Para revisar la data formateada con la informacion de todas la secciones
        // return resultPageTransform;

        // Para ver el resultado final de la home

        const resultHome = homeTransform[version](
            resultPageTransform,
            queryParams
        );
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
        versionUri: 'text',
        namePage: 'text',
        ticks: 'text'
    },
    ttl: 120
};
