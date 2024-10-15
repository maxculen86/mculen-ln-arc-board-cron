import { SITE_LANACION } from 'fusion:environment';
import pages from './utils/pageSource/index';
import get from '../../components/private/common/utils/get';
import transformv1 from './utils/pageSource/pageHome/v1/mobile/transform';
import homev2 from '../../components/private/LN/api/v2/mobile/home';

// Run with url http://172.17.0.1/api/mobile/v2/home/updated/e8915bf748c5b97521f6b8984791f1ae1c0652a2d27ab41c4083ff17142a272e/1712661842695/?_website=la-nacion-ar&outputType=json
const fetch = async (query, { cachedCall } = {}) => {
    let queryParams = {};
    const aliasPage = '/homepage';
    try {
        const regexVersionDeploy = /[0-9]+/;
        let versionDeploy = get(query, 'versionDeploy', null);
        versionDeploy =
            regexVersionDeploy.exec(versionDeploy) &&
            regexVersionDeploy.exec(versionDeploy).length > 0
                ? regexVersionDeploy.exec(versionDeploy)[0]
                : null;

        const version = get(query, 'versionUri', null);
        const cookie = get(query, 'useCookie', null);
        const alias = get(query, 'namePage', 'home');
        const website = get(query, 'website', null);
        const contentVersion = get(query, 'contentVersion', null);
        let ticksCache = get(query, 'ticks', null);

        if (version === null) {
            throw new Error('versionUri is required');
        }

        if (contentVersion === null) {
            throw new Error('content version is required');
        }

        if (alias !== 'home' || version !== 2) {
            throw new Error('content version not implemented for this case.');
        }

        ticksCache = ticksCache === null ? '' : ticksCache.replace('/', '');
        ticksCache = `${ticksCache}${new Date().getTime()}`;

        const keyCachedCall = `ApiPageHomeUpdated_${alias}_`.concat(ticksCache);

        if (!SITE_LANACION) {
            throw new Error('Variable SITE_LANACION missing');
        }

        queryParams = {
            rootPath: `${SITE_LANACION}${aliasPage}`,
            ticksCache,
            website,
            isPage: true,
            versionDeploy,
            cookie
        };

        // siempre se obtiene la ultima version de la home
        const resultPage = await cachedCall(keyCachedCall, pages.fetch, {
            query: queryParams,
            ttl: 120,
            independent: true
        });

        if (!resultPage) {
            throw new Error('Not found page');
        }

        const { information } = resultPage;
        queryParams.information = information;

        const resultPageTransform = await transformv1(resultPage, queryParams);

        const resultHome = homev2(resultPageTransform, queryParams);

        let hashContentVersion = '';

        if (
            Array.isArray(resultHome) &&
            Object.prototype.hasOwnProperty.call(resultHome[0], 'metadata') &&
            Object.prototype.hasOwnProperty.call(
                resultHome[0].metadata,
                'contentVersion'
            )
        ) {
            hashContentVersion = resultHome[0].metadata.contentVersion;
            return {
                homeUpdated: contentVersion !== hashContentVersion,
                contentVersion: hashContentVersion
            };
        }

        throw new Error('content version not implemented for this case.');
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(
            `Error content/apiPageHomeLastUpdateSource : ${JSON.stringify(
                queryParams
            )} - errorMsj:${err.message}`
        );
        throw err;
    }
};

export default {
    fetch,
    params: {
        website: 'text',
        versionUri: 'text',
        namePage: 'text',
        contentVersion: 'text',
        ticks: 'text',
        versionDeploy: 'text',
        useCookie: 'text'
    },
    ttl: 120
};
