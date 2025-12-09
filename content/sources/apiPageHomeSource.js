import { SITE_LANACION } from 'fusion:environment';
import homev1 from '../../components/private/LN/api/v1/mobile/home';
import homev2 from '../../components/private/LN/api/v2/mobile/home';
import get from '../../components/private/common/utils/get';
import pages from './utils/pageSource/index';
import transformBitacorav1 from './utils/pageSource/pageHome/v1/bitacora/transform';
import transformv1 from './utils/pageSource/pageHome/v1/mobile/transform';

function splitObjectForLogging(obj, maxSize = 20000) {
    const json = JSON.stringify(obj);
    const parts = [];
    for (let i = 0; i < json.length; i += maxSize) {
        parts.push(json.substring(i, i + maxSize));
    }
    return parts;
}

// Run with url http://172.17.0.1/api/mobile/v1/home/1/?_website=la-nacion-ar&outputType=json
const fetch = async (query, { cachedCall } = {}) => {
    let resultPage = {};
    const executionSteps = [];
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
        const regexVersionDeploy = /[0-9]+/;
        let versionDeploy = get(query, 'versionDeploy', null);
        versionDeploy =
            regexVersionDeploy.exec(versionDeploy) &&
            regexVersionDeploy.exec(versionDeploy).length > 0
                ? regexVersionDeploy.exec(versionDeploy)[0]
                : null;

        const version = get(query, 'versionUri', 1);
        const cookie = get(query, 'useCookie', null);
        const alias = get(query, 'namePage', 'home');
        const useCachedCall = get(query, 'useCachedCall', 'true') !== 'false';
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
            rootPath:
                aliasPage === '/homepage' || aliasPage === '/bitacora'
                    ? `${SITE_LANACION}/`
                    : `${SITE_LANACION}${aliasPage}`,
            ticksCache,
            website,
            isPage: true,
            versionDeploy,
            cookie
        };

        const apiPageHomeSourceFetchDate = new Date();

        executionSteps.push(
            `execute page fetch - query: ${JSON.stringify(queryParams)}`
        );

        if (useCachedCall) {
            executionSteps.push(
                `execute page fetch with cachedCall - query: ${JSON.stringify(queryParams)}`
            );
            resultPage = await cachedCall(keyCachedCall, pages.fetch, {
                query: queryParams,
                ttl: 120,
                independent: true
            });
        } else {
            executionSteps.push(
                `execute page fetch without cachedCall - query: ${JSON.stringify(queryParams)}`
            );

            console.warn(
                JSON.stringify({
                    name: 'BackendLnWarn',
                    customType: 'apiPageHomeSource',
                    log_details: {
                        message: 'se ejecuto el fetch sin cachedCall'
                    }
                })
            );

            resultPage = await pages.fetch(queryParams);
        }

        if (!resultPage) {
            executionSteps.push(`Fetch Home page - Not found page`);
            throw new Error('Not found page');
        }

        executionSteps.push(`Fetch Home page Ok`);

        const { information, homeFetchDate } = resultPage;
        queryParams.information = {
            ...information,
            homeFetchDate,
            keyCachedCall,
            apiPageHomeSourceFetchDate
        };
        executionSteps.push(`Set queryParams: ${JSON.stringify(queryParams)}`);

        // Para revisar la data transformada que viene del Layout
        // return resultPage;
        if (
            !configItemPage.transformPage ||
            !configItemPage.transformPage[version]
        ) {
            return resultPage;
        }

        executionSteps.push(
            `execute transformPage - query: ${JSON.stringify(queryParams)}`
        );

        const resultPageTransform = await configItemPage.transformPage[version](
            resultPage,
            queryParams
        );

        executionSteps.push(`resultPageTransform page Ok`);
        // Para revisar la data formateada con la informacion de todas la secciones
        // return resultPageTransform;

        if (
            !configItemPage.transformHome ||
            !configItemPage.transformHome[version]
        ) {
            return resultPageTransform;
        }

        // Para ver el resultado final de la home
        executionSteps.push(
            `execute transformHome - query: ${JSON.stringify(queryParams)}`
        );
        const resultHome = configItemPage.transformHome[version](
            resultPageTransform,
            queryParams
        );
        executionSteps.push(`execute resultHome Ok `);

        return Array.isArray(resultHome) ? resultHome[0] : {};
    } catch (error) {
        // eslint-disable-next-line no-console
        const guid = `${Date.now()}${Math.floor(Math.random() * 1e9)}`;

        if (typeof resultPage !== 'undefined' && resultPage !== null) {
            const parts = splitObjectForLogging(resultPage);
            parts.forEach((part, idx) => {
                console.warn(
                    JSON.stringify({
                        name: 'BackendLnWarn',
                        customType: 'apiPageHomeSourceError',
                        log_details: {
                            logId: guid,
                            part: `${idx + 1}/${parts.length}`,
                            page: part
                        }
                    })
                );
            });
        }

        console.error(
            JSON.stringify({
                name: 'BackendLnError',
                customErrorType: 'BackendLnError',
                customType: 'apiPageHomeSourceError',
                log_details: {
                    logId: guid,
                    executionSteps,
                    message: `Error content/apiPageHomeSource QueryParams: ${JSON.stringify(queryParams)} errorMsj: ${error.message}`
                }
            })
        );
        throw new Error(
            `Error content/apiPageHomeSource QueryParams: ${JSON.stringify(queryParams)} errorMsj: ${error.message}`
        );
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
        useCookie: 'text',
        useCachedCall: 'boolean'
    },
    ttl: 120
};
