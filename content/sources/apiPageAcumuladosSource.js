import { SITE_LANACION } from 'fusion:environment';
import get from '../../components/private/common/utils/get';
import pages from './utils/pageSource/index';
import sectionSource from './sectionSource';
import sectionsInPages from './utils/pageSource/pageAcumulados/config/configSectionPage.json';
import transform from './utils/pageSource/pageAcumulados/v1/mobile/transform';
import transformAcu from './utils/pageSource/acumulados/v1/mobile/bySection/transform';
import home from '../../components/private/LN/api/v1/mobile/home';

// Run with the url http://172.17.0.1/api/mobile/v1/page/bySection/ultimas-noticias/params=size:30;page:0/32/?_website=la-nacion-ar&outputType=json
// params: page 0 when load the page od Accumulated
// params: page >=1 when load the accumulated with pagination.

const getParamsSectionSource = data => {
    const title = get(
        data,
        'acumuladoGeneral.hierarchy_navigation',
        get(data, 'name', null)
    );
    const restriction = get(
        data,
        'acumuladoGeneral.mostrar_en_acu_apps',
        'true'
    );
    const configuration = get(data, 'configuration', null);
    return { title, restriction, configuration };
};

const fetch = async (query, { cachedCall }) => {
    let queryParams = {};
    let restriction = 'true';
    let resultSectionSource = null;
    let resultPage = null;
    let configuration = null;

    try {
        const { uri = '', website, versionUri } = query;
        const ticksCache = get(query, 'ticks', '').replace('/', '');
        const sectionId = get(query, 'sectionId', '').replace('/', '');
        const sectionIdParam = sectionId.substring(0, 2).includes('/')
            ? sectionId
            : `${''}`.concat(`/${sectionId || ''}`);

        const categoryUri = get(query, 'categoryUri', '').replace('/', '');
        const sectionsinPage = sectionsInPages?.find(
            e => e.sectionId === sectionId
        );

        const sectioninPage =
            sectionsinPage && sectionsinPage.namePage
                ? sectionsinPage.namePage
                : sectionId;

        const sectionsCustom = sectionsInPages
            ?.filter(e => e?.isCustom)
            ?.map(e => e.sectionId);
        if (!versionUri) {
            throw new Error('The api page must have a version');
        }

        let regexParams = new RegExp(/size:(\d+)/);
        let matches = regexParams.exec(get(query, 'params', ''));
        let title = sectionsinPage && sectionsinPage.aliasTitle;
        title = title == null ? sectionId.replace('/', '') : title;

        const size = matches && matches.length > 1 ? matches[1] : 30;
        regexParams = new RegExp(/page:(\d+)/);
        matches = regexParams.exec(get(query, 'params', ''));

        let page = matches && matches.length > 1 ? parseInt(matches[1], 0) : 0;
        page = page < 0 ? 0 : page;

        const isPage = page === 0 && get(sectionsinPage, 'isPage', false);

        const isCustom =
            sectionsinPage && sectionsinPage.isCustom
                ? sectionsinPage.isCustom
                : false;

        queryParams = {
            id: sectionIdParam,
            website: query?.website
        };
        if (!isCustom) {
            resultSectionSource = await cachedCall(
                'apiPageSectionSource',
                sectionSource.fetch,
                {
                    query: queryParams
                }
            );
        }
        const paramsSectionsSource = getParamsSectionSource(
            resultSectionSource
        );

        title =
            get(paramsSectionsSource, 'title', null) == null
                ? title
                : get(paramsSectionsSource, 'title', null);

        restriction = get(paramsSectionsSource, 'restriction', true);
        configuration = get(paramsSectionsSource, 'configuration', null);

        if (isPage || sectionsinPage?.featureAcumuladosInPage) {
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
                featureInPage: sectionsinPage?.featureAcumuladosInPage,
                sectionSource: resultSectionSource,
                isPage
            };

            resultPage = await cachedCall('ApiPageAcumulados', pages.fetch, {
                query: queryParams,
                ttl: 120
            });
            const { information } = resultPage;

            // Para revisar la data cruda que viene del Layout
            // return resultPage;
            if (isPage) {
                const resultPageTransform = await transform(
                    resultPage,
                    queryParams
                );
                // Para revisar la data formateada con la informacion de todas la secciones
                // return resultPageTransform;
                queryParams.information = information;
                const resultHome = home(resultPageTransform, queryParams);
                // Para revisar la data despues del transform, estructura final
                // return resultHome;
                return Array.isArray(resultHome) ? resultHome[0] : {};
            }
        }

        queryParams = {
            sectionId: sectionsCustom?.includes(sectionId)
                ? null
                : sectionIdParam,
            page: page > 0 ? page : 1,
            size,
            restriction,
            website,
            uri,
            title,
            configuration,
            categoryUri,
            versionUri,
            featureInPage: sectionsinPage?.featureAcumuladosInPage,
            isPage
        };
        return await transformAcu(resultPage, queryParams);
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
