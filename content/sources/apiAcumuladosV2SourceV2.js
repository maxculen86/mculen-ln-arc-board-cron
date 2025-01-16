import { SITE_LANACION } from 'fusion:environment';
import get from '../../components/private/common/utils/get';
import ultimasNoticiasSectionsSource from './utils/acuArticlesSource/ultimasNoticiasSectionsSource';
import sectionSource from './sectionSource';
import sectionsDataJson from './utils/pageSource/pageAcumulados/config/configSectionPage.json';
import transformAcu from './utils/pageSource/acumulados/common/transformAcuV2';
import NotFoundError from './utils/notFoundError';

const getSizeParamFromQuery = query => {
    const pattern = /size:(\d+)/;
    const regexForSizeParam = new RegExp(pattern);
    const matchForSize = regexForSizeParam.exec(get(query, 'params', ''));
    return matchForSize && matchForSize.length > 1 ? matchForSize[1] : 30;
};

const getPageParamFromQuery = query => {
    const pattern = /page:(\d+)/;
    const regexForPageParam = new RegExp(pattern);
    const matchForPageParam = regexForPageParam.exec(get(query, 'params', ''));

    const page =
        matchForPageParam && matchForPageParam.length > 1
            ? parseInt(matchForPageParam[1], 10)
            : 1;

    if (page < 1) {
        throw new Error('Page parameter should not be less than 1');
    }

    return page;
};

const getParamsFromQuery = query => {
    const { uri = '', website, versionUri, apiTransform } = query;
    const ticksCache = get(query, 'ticks', '').replace('/', '');
    const categoryUri = get(query, 'categoryUri', '').replace('/', '');

    const slug = get(query, 'sectionId', '');

    const sectionId = get(query, 'sectionId', '').replace('/', '');

    const sectionIdParam = sectionId.substring(0, 2).includes('/')
        ? sectionId
        : `${''}`.concat(`/${sectionId || ''}`);

    const sectionData = sectionsDataJson?.find(e => e.sectionId === sectionId);

    const sectioninPage =
        sectionData && sectionData.namePage ? sectionData.namePage : sectionId;

    const customSectionsIds = sectionsDataJson
        ?.filter(e => e.isCustom)
        ?.map(e => e.sectionId);

    if (!versionUri) {
        throw new Error('The api page must have a version');
    }

    const size = getSizeParamFromQuery(query);

    const page = getPageParamFromQuery(query);

    const isCustomPage =
        sectionData && sectionData.isCustom ? sectionData.isCustom : false;

    return {
        uri,
        website,
        versionUri,
        ticksCache,
        categoryUri,
        sectionId,
        sectionIdParam,
        sectionData,
        sectioninPage,
        customSectionsIds,
        size,
        page,
        isCustomPage,
        slug,
        apiTransform
    };
};

const fetchSectionSource = async (
    sectionIdParam,
    query,
    isCustomPage,
    cachedCall
) => {
    let sectionSourceResult = null;
    const sectionsTitlesCustom = [
        '/economia/inteligencia-artificial',
        '/economia/IA',
        '/quesale',
        '/que-sale'
    ];

    const queryParams = {
        id: sectionIdParam,
        website: query?.website,
        api: 'true'
    };

    if (!isCustomPage) {
        sectionSourceResult = await cachedCall(
            'apiPageSectionSource',
            sectionSource.fetch,
            {
                query: queryParams
            }
        );
    }

    const sectionTitle =
        sectionSourceResult?.acumuladoGeneral?.hierarchy_navigation;
    const sectionName = sectionSourceResult?.name;

    let title = sectionTitle || sectionName;

    const sectionData = sectionsDataJson?.find(
        e => get(e, 'slug') === sectionIdParam
    );
    if (sectionsTitlesCustom.includes(sectionIdParam) && sectionData) {
        title = sectionData.aliasTitle;
    }

    const restriction = get(
        sectionSourceResult,
        'acumuladoGeneral.mostrar_en_acu_apps',
        'true'
    );
    const configuration = get(sectionSourceResult, 'configuration', null);
    return { title, restriction, configuration };
};

const fetch = async (query, { cachedCall } = {}) => {
    let restriction = 'true';
    let configuration = null;

    try {
        const {
            uri,
            website,
            versionUri,
            categoryUri,
            sectionId,
            sectionIdParam,
            sectionData,
            sectioninPage,
            customSectionsIds,
            size,
            page,
            isCustomPage,
            ticksCache,
            apiTransform
        } = getParamsFromQuery(query);

        const sectionSourceResult = await fetchSectionSource(
            sectionIdParam,
            query,
            isCustomPage,
            cachedCall
        );

        const { title } = sectionSourceResult;

        restriction = get(sectionSourceResult, 'restriction', true);
        configuration = get(sectionSourceResult, 'configuration', null);

        const queryParams = {
            sectionId: customSectionsIds?.includes(sectionId)
                ? null
                : sectionIdParam,
            size,
            restriction,
            website,
            uri,
            title,
            page: page >= 1 ? page : 1,
            configuration,
            categoryUri,
            versionUri,
            featureInPage: sectionData?.featureAcumuladosInPage,
            apiTransform
        };

        if (sectionId === 'ultimas-noticias') {
            const ultimasNoticiasSectionsResult =
                await ultimasNoticiasSectionsSource.fetch({
                    rootPath: `${SITE_LANACION}/${sectioninPage}`,
                    website,
                    ticksCache,
                    cookie: query.cookie
                });
            queryParams.sections = ultimasNoticiasSectionsResult;
        }

        if (sectionId === 'suscriptores') {
            queryParams.tagId = 'la-nacion-cerca';
        }

        return await transformAcu(queryParams, { cachedCall });
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw new NotFoundError(
                `Seccion no encontrada: ${query.sectionId}`
            );
        }
        // eslint-disable-next-line no-console
        console.warn(
            `Error in content/apiAcumuladosV2SourceV2 : 
            query parameters: ${JSON.stringify(query)} 
            - errorMsj: ${error.message}`
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
        ticks: 'text',
        cookie: 'text',
        apiTransform: 'text'
    },
    ttl: 120
};
