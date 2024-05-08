import { SITE_LANACION } from 'fusion:environment';
import homev1 from '../../components/private/LN/api/v1/mobile/home';
import homev2 from '../../components/private/LN/api/v2/mobile/home';
import get from '../../components/private/common/utils/get';
import pages from './utils/pageSource/index';
import transformBitacorav1 from './utils/pageSource/pageHome/v1/bitacora/transform';
import transformv1 from './utils/pageSource/pageHome/v1/mobile/transform';
import BackendLnError from '../../components/private/LN/api/common/models/backendLnError';

// Run with url http://172.17.0.1/api/mobile/v1/home/1/?_website=la-nacion-ar&outputType=json
const fetch = async (query, { cachedCall } = {}) => {
    let queryParams = {};
    const configPages = {
        home: {
            aliasPage: '/homepage',
            transformPage: { 1: transformv1, 2: transformv1 },
            transformHome: { 1: homev1, 2: homev2 }
        },
        bitacora: {
            aliasPage: '/homepage',
            transformPage: { 1: transformBitacorav1 }
        },
        bitacoraLN10: {
            aliasPage: '/homepage-ln10',
            transformPage: { 1: transformBitacorav1 }
        },
        homeLN: {
            aliasPage: '/homepage-LN10',
            transformPage: { 1: transformv1, 2: transformv1 },
            transformHome: { 1: homev1, 2: homev2 }
        },
        homeLN10: {
            aliasPage: '/homepage-ln10',
            transformPage: { 1: transformv1, 2: transformv1 },
            transformHome: { 1: homev1, 2: homev2 }
        },
        sports: {
            aliasPage: '/deportes',
            transformPage: { 1: transformv1, 2: transformv1 },
            transformHome: { 1: homev1, 2: homev2 }
        },
        default: {
            transformPage: { 1: transformv1, 2: transformv1 },
            transformHome: { 1: homev1, 2: homev2 }
        }
    };

    try {
        const regexVersionDeploy = new RegExp('[0-9]+');
        let versionDeploy = get(query, 'versionDeploy', null);
        versionDeploy =
            regexVersionDeploy.exec(versionDeploy) &&
            regexVersionDeploy.exec(versionDeploy).length > 0
                ? regexVersionDeploy.exec(versionDeploy)[0]
                : null;

        const version = get(query, 'versionUri', 1);
        const cookie = get(query, 'useCookie', null);
        const alias = get(query, 'namePage', 'home');

        let configItemPage = configPages[alias];
        if (!configItemPage) {
            configItemPage = configPages.default;
            configItemPage.aliasPage = '/'.concat(alias);
        }
        const { aliasPage } = configItemPage;

        let ticksCache = get(query, 'ticks', null);
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
            isPage: true,
            versionDeploy,
            cookie
        };

        const apiPageHomeSourceFetchDate = new Date();

        const resultPage = await cachedCall(keyCachedCall, pages.fetch, {
            query: queryParams,
            ttl: 120,
            independent: true
        });

        if (!resultPage) {
            throw new Error('Not found page');
        }

        const { information, homeFetchDate } = resultPage;
        queryParams.information = information;
        // Para revisar la data transformada que viene del Layout
        // return resultPage;
        if (
            !configItemPage.transformPage ||
            !configItemPage.transformPage[version]
        ) {
            return resultPage;
        }

        const resultPageTransform = await configItemPage.transformPage[version](
            resultPage,
            queryParams
        );
        // Para revisar la data formateada con la informacion de todas la secciones
        // return resultPageTransform;

        if (
            !configItemPage.transformHome ||
            !configItemPage.transformHome[version]
        ) {
            return resultPageTransform;
        }

        // Para ver el resultado final de la home

        const resultHome = configItemPage.transformHome[version](
            resultPageTransform,
            queryParams,
            homeFetchDate,
            information.layoutDate,
            keyCachedCall,
            apiPageHomeSourceFetchDate
        );

        return Array.isArray(resultHome) ? resultHome[0] : {};
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
            new BackendLnError(
                `Error content/apiPageHomeSource : ${JSON.stringify(
                    queryParams
                )} - errorMsj:${error.message}`,
                'apiPegeHomeSourceError'
            )
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
        ticks: 'text',
        versionDeploy: 'text',
        useCookie: 'text'
    },
    ttl: 120
};
