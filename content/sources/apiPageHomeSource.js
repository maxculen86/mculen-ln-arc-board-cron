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

const resolveVersions = (query) => {
    const version = get(query, 'versionUri', 1);
    const rawDeploy = get(query, 'versionDeploy', null);
    const match = String(rawDeploy).match(/\d+/);

    return {
        version,
        versionDeploy: match ? match[0] : null,
        useCachedCall: get(query, 'useCachedCall', 'true') !== 'false',
    };
};

const configPages = {
    home: {
        aliasPage: '/homepage',
        transformPage: { 1: transformv1, 2: transformv1 },
        transformHome: { 1: homev1, 2: homev2 },
    },
    bitacora: {
        aliasPage: '/homepage',
        transformPage: { 1: transformBitacorav1 },
    },
    default: {
        transformPage: { 1: transformv1, 2: transformv1 },
        transformHome: { 1: homev1, 2: homev2 },
    },
};

const resolvePageConfig = (alias) => {
    if (configPages[alias]) return configPages[alias];
    return { ...configPages.default, aliasPage: `/${alias}` };
};

const buildQueryParams = ({ aliasPage, ticks, website, versionDeploy, cookie }) => {
    if (!SITE_LANACION) throw new Error('Variable SITE_LANACION missing');

    const cleanTicks = ticks ? ticks.replace('/', '') : '';
    return {
        rootPath:
            aliasPage === '/homepage' || aliasPage === '/bitacora'
                ? `${SITE_LANACION}/`
                : `${SITE_LANACION}${aliasPage}`,
        ticksCache: cleanTicks,
        website,
        isPage: true,
        versionDeploy,
        cookie,
    };
};

const fetchPage = async ({ useCachedCall, cachedCall, key, queryParams, executionSteps }) => {
    executionSteps.push(`execute page fetch - query: ${JSON.stringify(queryParams)}`);

    if (!useCachedCall) {
        console.warn(
            JSON.stringify({
                name: 'BackendLnWarn',
                customType: 'apiPageHomeSource',
                log_details: { message: 'se ejecuto el fetch sin cachedCall' },
            })
        );
        return pages.fetch(queryParams);
    }

    executionSteps.push(`execute page fetch with cachedCall - query: ${JSON.stringify(queryParams)}`);
    return cachedCall(key, pages.fetch, { query: queryParams, ttl: 120, independent: true });
};

const applyTransformPage = async (config, version, page, queryParams) => {
    if (!config.transformPage?.[version]) return page;
    return config.transformPage[version](page, queryParams);
};

const applyTransformHome = (config, version, page, queryParams) => {
    if (!config.transformHome?.[version]) return page;
    return config.transformHome[version](page, queryParams);
};

const handlePageHomeError = (error, resultPage, executionSteps, queryParams = {}) => {
    const guid = `${Date.now()}${Math.floor(Math.random() * 1e9)}`;

    if (resultPage) {
        const parts = splitObjectForLogging(resultPage);
        parts.forEach((part, idx) => {
            console.warn(
                JSON.stringify({
                    name: 'BackendLnWarn',
                    customType: 'apiPageHomeSourceError',
                    log_details: { logId: guid, part: `${idx + 1}/${parts.length}`, page: part },
                })
            );
        });
    }

    console.error(
        JSON.stringify({
            name: 'BackendLnError',
            customErrorType: 'BackendLnError',
            customType: 'apiPageHomeSourceError',
            log_details: { logId: guid, executionSteps, message: `Error content/apiPageHomeSource QueryParams: ${JSON.stringify(queryParams)} errorMsj: ${error.message}` },
        })
    );

    throw new Error(
        `Error content/apiPageHomeSource QueryParams: ${JSON.stringify(queryParams)} errorMsj: ${error.message}`
    );

};

const fetch = async (query, { cachedCall } = {}) => {
    const executionSteps = [];
    let resultPage;
    let queryParams;

    try {
        const { version, versionDeploy, useCachedCall } = resolveVersions(query);
        const alias = get(query, 'namePage', 'home');
        const configItemPage = resolvePageConfig(alias);
        queryParams = buildQueryParams({
            aliasPage: configItemPage.aliasPage,
            ticks: get(query, 'ticks', null),
            website: get(query, 'website', null),
            versionDeploy,
            cookie: get(query, 'useCookie', null),
        });

        let ticksCache = get(query, 'ticks', null);
        ticksCache = ticksCache === null ? '' : ticksCache.replace('/', '');
        const prefixTicksCache =
            ticksCache === '' ? '' : '_' + ticksCache;

        const keyCachedCall = `ApiPageHome${alias}${prefixTicksCache}`;

        resultPage = await fetchPage({ useCachedCall, cachedCall, key: keyCachedCall, queryParams, executionSteps });

        if (!resultPage) {
            executionSteps.push(`Fetch Home page - Not found page`);
            throw new Error('Not found page');
        }

        const apiPageHomeSourceFetchDate = new Date();
        const { information, homeFetchDate } = resultPage;

        queryParams.information = {
            ...information,
            homeFetchDate,
            keyCachedCall,
            ticksCache,
            apiPageHomeSourceFetchDate,
        };

        const transformedPage = await applyTransformPage(configItemPage, version, resultPage, queryParams);
        const home = applyTransformHome(configItemPage, version, transformedPage, queryParams);

        return Array.isArray(home) ? home[0] : home;
    } catch (error) {
        handlePageHomeError(error, resultPage, executionSteps, queryParams);
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
        useCachedCall: 'boolean',
    },
    ttl: 120,
};
