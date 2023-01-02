import { SITE_LANACION } from 'fusion:environment';
import get from '../../components/private/common/utils/get';
import pages from './utils/servicesSource/pages';
import sectionSource from './sectionSource';
import sectionsInPages from './utils/servicesSource/pages/config/sectionsInPagesConfig.json';
import transform from './utils/servicesSource/pages/transform';
import home from '../../components/private/LN/api/v1/global/home';


const getParamsSectionSource = data => {
    const title =
        get(data, 'acumuladoGeneral.hierarchy_navigation', null) ??
        get(data, 'name', null);
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

        let page = matches.length > 1 ? parseInt(matches[1], 0) : 0;
        page = page <= 0 ? 1 : page;
        const isPage = true; //page === 0 && sectionsinPage?.isPage;

        const isCustom = sectionsinPage?.isCustom ?? false;

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

        title = get(paramsSectionsSource, 'title', null) ?? title;
        restriction = get(paramsSectionsSource, 'restriction', true);
        configuration = get(paramsSectionsSource, 'configuration', null);

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
                featureInPage: sectionsinPage?.featureAcumuladosInPage,
                sectionSource: resultSectionSource
            };

            resultPage = await cachedCall('ApiPageAcumulados', pages.fetch, {
                query: queryParams,
                ttl: 120
            });

            if (sectionsinPage?.featureAcumuladosInPage) {
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
                    featureInPage: sectionsinPage?.featureAcumuladosInPage
                };
            }

            if (isPage) {
                const resultPageTransform = await transform(
                    resultPage,
                    queryParams
                );
                // Para revisar la data antes del transform devuelve las  secciones formateadas con el campo information y otros
                // return resultPageTransform;
                const resultHome = home(resultPageTransform);
                // Para revisar la data despues del transform, estructura final
                // return resultHome;
                return Array.isArray(resultHome) ? resultHome[0] : {};
            }
        }
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
