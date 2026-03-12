import { SITE_LANACION } from 'fusion:environment';
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

const resolveVersions = query => {
    const version = get(query, 'versionUri', 1);
    const rawDeploy = get(query, 'versionDeploy', null);
    const match = String(rawDeploy).match(/\d+/);

    return {
        version,
        versionDeploy: match ? match[0] : null,
        useCachedCall: get(query, 'useCachedCall', 'true') !== 'false'
    };
};

const resolveTicks = query => {
    const raw = get(query, 'ticks', null);
    return raw ? raw.replace('/', '') : '';
};

const configPages = {
    home: {
        aliasPage: '/homepage',
        transformPage: transformv1,
        transformHome: homev2
    },
    bitacora: {
        aliasPage: '/homepage',
        transformPage: transformBitacorav1
    },
    default: {
        transformPage: transformv1,
        transformHome: homev2
    }
};

const resolvePageConfig = alias => {
    if (configPages[alias]) return configPages[alias];
    return { ...configPages.default, aliasPage: `/${alias}` };
};

const buildQueryParams = ({
    aliasPage,
    ticksCache,
    website,
    versionDeploy,
    cookie
}) => {
    if (!SITE_LANACION) throw new Error('Variable SITE_LANACION missing');

    return {
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
};

const fetchPage = async ({
    useCachedCall,
    cachedCall,
    key,
    queryParams,
    executionSteps
}) => {
    executionSteps.push(
        `execute page fetch - query: ${JSON.stringify(queryParams)}`
    );

    if (!useCachedCall) {
        console.warn(
            JSON.stringify({
                name: 'BackendLnWarn',
                customType: 'apiPageHomeSource',
                log_details: { message: 'se ejecuto el fetch sin cachedCall' }
            })
        );
        return pages.fetch(queryParams);
    }

    executionSteps.push(
        `execute page fetch with cachedCall - query: ${JSON.stringify(queryParams)}`
    );

    return cachedCall(key, pages.fetch, {
        query: queryParams,
        ttl: 120,
        independent: true
    });
};

const handlePageHomeError = (
    error,
    resultPage,
    executionSteps,
    queryParams = {}
) => {
    const guid = `${Date.now()}${Math.floor(Math.random() * 1e9)}`;

    if (resultPage) {
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
                message: `Error content/apiPageHomeSource QueryParams: ${JSON.stringify(
                    queryParams
                )} errorMsj: ${error.message}`
            }
        })
    );

    throw new Error(
        `Error content/apiPageHomeSource QueryParams: ${JSON.stringify(
            queryParams
        )} errorMsj: ${error.message}`
    );
};

const fetch = async (query, { cachedCall } = {}) => {
    const executionSteps = [];
    let resultPage;
    let queryParams;

    try {
        const { versionDeploy, useCachedCall } = resolveVersions(query);
        const alias = get(query, 'namePage', 'home');
        const configItemPage = resolvePageConfig(alias);
        const ticksCache = resolveTicks(query);

        queryParams = buildQueryParams({
            aliasPage: configItemPage.aliasPage,
            ticksCache,
            website: get(query, 'website', null),
            versionDeploy,
            cookie: get(query, 'useCookie', null)
        });

        const keyCachedCall = `ApiPageHome${alias}${
            ticksCache ? `_${ticksCache}` : ''
        }`;

        resultPage = await fetchPage({
            useCachedCall,
            cachedCall,
            key: keyCachedCall,
            queryParams,
            executionSteps
        });

        if (!resultPage) {
            executionSteps.push('Fetch Home page - Not found page');
            throw new Error('Not found page');
        }

        const apiPageHomeSourceFetchDate = new Date();
        const { information, homeFetchDate } = resultPage;

        queryParams.information = {
            ...information,
            homeFetchDate,
            keyCachedCall,
            ticksCache,
            apiPageHomeSourceFetchDate
        };

        const transformedPage = configItemPage.transformPage
            ? await configItemPage.transformPage(resultPage, queryParams)
            : resultPage;

        if (!configItemPage.transformHome) {
            return transformedPage;
        }

        const home = configItemPage.transformHome(transformedPage, queryParams);
        return Array.isArray(home) ? home[0] : home;
    } catch (error) {
        return handlePageHomeError(
            error,
            resultPage,
            executionSteps,
            queryParams
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
