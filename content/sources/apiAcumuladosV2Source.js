import { SITE_LANACION } from 'fusion:environment';
import get from '../../components/private/common/utils/get';
import ultimasNoticiasSectionsSource from './utils/acuArticlesSource/ultimasNoticiasSectionsSource';
import sectionSource from './sectionSource';
import sectionsDataJson from './utils/pageSource/pageAcumulados/config/configSectionPage.json';
import transformAcu from './utils/pageSource/acumulados/v2/mobile/bySection/transform';
import acuTransformV2Format from './utils/pageSource/acumulados/v2/mobile/bySection/acuTransformV2Format';

const fetch = async (query, { cachedCall }) => {
    let restriction = 'true';
    let configuration = null;

    try {
        let {
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
            title,
            page,
            isCustomPage,
            ticksCache
        } = getParamsFromQuery(query);

        const { paramsSectionsSource } = await fetchSectionSource(
            sectionIdParam,
            query,
            isCustomPage,
            cachedCall
        );

        title =
            get(paramsSectionsSource, 'title', null) == null
                ? title
                : get(paramsSectionsSource, 'title', null);

        restriction = get(paramsSectionsSource, 'restriction', true);
        configuration = get(paramsSectionsSource, 'configuration', null);

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
            featureInPage: sectionData?.featureAcumuladosInPage
        };

        if (sectionId === 'ultimas-noticias') {
            const ultimasNoticiasSectionsResult = await ultimasNoticiasSectionsSource.fetch(
                {
                    rootPath: `${SITE_LANACION}/${sectioninPage}`,
                    website,
                    ticksCache
                }
            );
            queryParams.sections = ultimasNoticiasSectionsResult;
        }

        if (sectionId === 'suscriptores') {
            queryParams.tagId = 'la-nacion-cerca';
        }

        const transformedAcu = await transformAcu(queryParams);

        const paginationValue = calculatePaginationValue(
            transformedAcu[0].acumuladoTotal,
            size,
            page
        );
        return acuTransformV2Format(
            transformedAcu,
            sectionData,
            paginationValue
        );
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error content/apiTestAcumuladoSource : ${JSON.stringify(
                query
            )} - errorMsj:${error.message}`
        );
        throw new Error(error);
    }
};

const calculatePaginationValue = (acumuladoTotal, size, page) => {
    const numberOfPages = acumuladoTotal / size;
    return page < numberOfPages;
};

const getSizeParamFromQuery = query => {
    const regexForSizeParam = new RegExp(/size:(\d+)/);
    const matchForSize = regexForSizeParam.exec(get(query, 'params', ''));
    const size = matchForSize && matchForSize.length > 1 ? matchForSize[1] : 30;
    return size;
};

const getPageParamFromQuery = query => {
    const regexForPageParam = new RegExp(/page:(\d+)/);
    const matchForPageParam = regexForPageParam.exec(get(query, 'params', ''));

    const page =
        matchForPageParam && matchForPageParam.length > 1
            ? parseInt(matchForPageParam[1], 0)
            : 0;

    if (page < 0) {
        throw new Error('Page parameter should not be less than 0');
    }

    return page;
};

const getParamsFromQuery = query => {
    const { uri = '', website, versionUri } = query;
    const ticksCache = get(query, 'ticks', '').replace('/', '');
    const categoryUri = get(query, 'categoryUri', '').replace('/', '');

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

    let title = sectionData && sectionData.aliasTitle;
    title = title == null ? sectionId.replace('/', '') : title;

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
        title,
        page,
        isCustomPage
    };
};

const fetchSectionSource = async (
    sectionIdParam,
    query,
    isCustomPage,
    cachedCall
) => {
    let sectionSourceResult = null;

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

    const title = get(
        sectionSourceResult,
        'acumuladoGeneral.hierarchy_navigation',
        get(sectionSourceResult, 'name', null)
    );
    const restriction = get(
        sectionSourceResult,
        'acumuladoGeneral.mostrar_en_acu_apps',
        'true'
    );
    const configuration = get(sectionSourceResult, 'configuration', null);
    return {
        sectionSourceParams: { title, restriction, configuration }
    };
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
