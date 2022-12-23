import {
    SITE_LANACION,
    CONTENT_BASE,
    LANACION_SERVICES_URL,
    ARC_ACCESS_TOKEN
} from 'fusion:environment';
import request from 'request-promise-native';
import get from '../../components/private/common/utils/get';
import pages from './utils/servicesSource/pages';
import sectionSource from './sectionSource';
import sectionsInPages from './utils/servicesSource/pages/config/sectionsInPagesConfig.json';
import getArticlesAcumulados from './utils/servicesSource/pages/apiPageAcumuladosSource/getArticlesAcumulados';
import transformAcu from './utils/servicesSource/pages/apiPageAcumuladosSource/transform';
import transform from './utils/servicesSource/pages/transform';
import { getFeatureInPage } from './utils/servicesSource/pages/helper';
import home from '../../components/private/LN/api/v1/global/home';

const fetch = async (query, { cachedCall }) => {
    let queryParams = {};
    let restriction = 'true';
    let resultSectionSource = null;
    let resultPage = null;

    try {
        const { uri = '', website, versionUri } = query;
        const ticksCache = get(query, 'ticks', '')?.replace('/', '');
        const sectionId = get(query, 'sectionId', '')?.replace('/', '');
        const sectionIdParam = sectionId.substring(0, 2).includes('/')
            ? sectionId
            : `${''}`.concat(`/${sectionId || ''}`);

        const categoryUri = get(query, 'categoryUri', '')?.replace('/', '');
        const sectionsinPage = sectionsInPages?.find(
            e => e.sectionId === sectionId
        );
        const sectioninPage = sectionsinPage?.namePage ?? sectionId;
        const sectionsCustom = sectionsInPages
            ?.filter(e => e?.isCustom)
            ?.map(e => e.sectionId);
        if (!versionUri) {
            throw new Error('The api page must have a version');
        }

        let regexParams = new RegExp(/size:(\d+)/);
        let matches = regexParams.exec(get(query, 'params', ''));
        let title = sectionId?.replace('/', '');

        const size = matches.length > 1 ? matches[1] : 30;
        regexParams = new RegExp(/page:(\d+)/);
        matches = regexParams.exec(get(query, 'params', ''));

        const page = matches.length > 1 ? parseInt(matches[1], 0) : 0;
        const isPage = page === 0 && sectionsinPage?.isPage;

        const isCustom = sectionsinPage?.isCustom ?? false;

        queryParams = {
            id: sectionIdParam,
            website: query?.website
        };

        resultSectionSource = await cachedCall(
            'apiPageSectionSource',
            sectionSource.fetch,
            {
                query: queryParams
            }
        );
        title =
            get(
                resultSectionSource,
                'acumuladoGeneral.hierarchy_navigation',
                null
            ) ?? get(resultSectionSource, 'name', null);
        restriction = get(
            resultSectionSource,
            'acumuladoGeneral.mostrar_en_acu_apps',
            'true'
        );

        if (isPage || isCustom) {
            queryParams = {
                rootPath: `${SITE_LANACION}/${sectioninPage}`,
                ticksCache: ticksCache.toString(),
                website,
                restriction,
                uri,
                title: sectioninPage,
                configuration: null,
                categoryUri,
                versionUri,
                sectionSource: resultSectionSource
            };

            resultPage = await cachedCall('ApiPageAcumulados', pages.fetch, {
                query: queryParams,
                ttl: 120
            });

            if (sectionsinPage?.featureInPage && !isPage) {
                resultPage = getFeatureInPage(
                    resultPage,
                    sectionsinPage?.featureInPage
                );
            }
            //return { resultPage };
            if (isPage) {
                const resultPageTransform = await transform(
                    resultPage,
                    queryParams
                );
                const resultHome = home(resultPageTransform);
                //return resultHome;
                return Array.isArray(resultHome) ? resultHome[0] : {};
            }
        }
        queryParams = {
            sectionId: sectionsCustom?.includes(sectionId)
                ? null
                : sectionIdParam,
            sections: get(resultPage, 'sections', []),
            page: page > 0 ? page : 1,
            size,
            restriction,
            website,
            uri,
            title,
            configuration: get(resultSectionSource, 'configuration', null),
            categoryUri,
            versionUri
        };
        //return queryParams;
        const respAcumulados = await getArticlesAcumulados(queryParams);
        //return respAcumulados;
        queryParams = {
            uri,
            title,
            configuration: get(resultSectionSource, 'configuration', null),
            categoryUri,
            versionUri
        };
        //return queryParams;
        return transformAcu(respAcumulados, queryParams);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error content/apiPageAcumuladosSource : ${JSON.stringify(
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
        sectionId: 'text',
        params: 'text',
        sections: 'text',
        categoryUri: 'text',
        versionUri: 'text',
        ticks: 'text'
    },
    ttl: 120
};
