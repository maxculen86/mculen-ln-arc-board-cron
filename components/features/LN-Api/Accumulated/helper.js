import { enumTypeError } from '../../../private/LN/api/common/enums/enumTypeError';
import { BackendLnError } from '../../../private/LN/api/common/models/backendLnError';
import IndexAcuV1 from '../../../private/LN/api/v1/global/accumulated';
import IndexAcuV1Mobile from '../../../private/LN/api/v1/mobile/accumulated';
import IndexAcuV2 from '../../../private/LN/api/v2/global/accumulated';
import browser from '../../../private/common/utils/browser';
import get from '../../../private/common/utils/get';
import getSizesFrom from '../../../private/common/utils/getSizesFrom';

export const SECTION_SUSCRIPTORES = '/suscriptores';
export const SECTION_ULTIMAS_NOTICIAS = '/ultimas-noticias';
export const DEFAULT_SIZE = 30;
export const DEFAULT_PAGE = 1;
export const BANNERS_PAGINATION_THRESHOLD = 16;
export const DEFAULT_VERSION = 2;
export const SOURCE_DISTRIBUTOR = 'distributorSource';
export const SOURCE_SECTION = 'sectionSource';

export const isDistributorSource = (source, distributorId) =>
    source ? source === SOURCE_DISTRIBUTOR : Boolean(distributorId);

export const API_DATA = {
    global: {
        1: IndexAcuV1,
        2: IndexAcuV2
    },
    mobile: {
        1: IndexAcuV1Mobile,
        2: IndexAcuV1Mobile
    }
};

export const toSectionKey = id =>
    (typeof id === 'string' && id.toLowerCase()) || '';

export const formatSectionsForUltimas = sections =>
    JSON.stringify(sections)
        ?.replace(/,/g, '+OR+')
        ?.replace('[', '(')
        ?.replace(']', ')');

export const buildLnAcuBySectionQuery = ({
    arcSite,
    globalContent,
    isAdmin,
    sizeCf,
    pageCf,
    paramUrlId,
    sections,
    requestUri,
    featureSectionId,
    distributorId,
    source
}) => {
    const id = featureSectionId || get(globalContent, '_id', null);
    const restriction = get(
        globalContent,
        'acumuladoGeneral.mostrar_en_acu_apps',
        'true'
    );

    const { size, page } = getSizesFrom(
        isAdmin,
        sizeCf,
        pageCf,
        paramUrlId,
        requestUri
    );

    const baseResp = {
        page,
        imageConfig: 'm',
        api: true,
        'arc-site': arcSite
    };

    const sectionKey = toSectionKey(id);

    if (sectionKey === SECTION_SUSCRIPTORES) {
        return {
            ...baseResp,
            tagId: 'la-nacion-cerca',
            sourceOrigin: 'composer',
            size: size || DEFAULT_SIZE
        };
    }

    if (sectionKey === SECTION_ULTIMAS_NOTICIAS && sections) {
        return {
            ...baseResp,
            sectionsIds: formatSectionsForUltimas(sections),
            sourceOrigin: 'composer',
            size: size || DEFAULT_SIZE
        };
    }

    const excludeSourceOrigin =
        restriction === 'false' ? 'ArcImporter-LnData' : '';

    if (isDistributorSource(source, distributorId)) {
        return {
            ...baseResp,
            distributorId,
            size,
            excludeSourceOrigin
        };
    }

    return {
        ...baseResp,
        sectionId: id,
        size,
        excludeSourceOrigin
    };
};

export const resolveVersion = (versionUri, urlVersionNum) => {
    const fromRoute =
        versionUri !== undefined && versionUri !== null && versionUri !== ''
            ? Number(versionUri)
            : NaN;

    if (!Number.isNaN(fromRoute)) return fromRoute;
    if (!Number.isNaN(urlVersionNum)) return urlVersionNum;
    return DEFAULT_VERSION;
};

export const resolveIndexTransform = (routeParams, requestUri) => {
    const urlVersionNum = Number(browser.getApiVersion(requestUri));
    const versionUriNum = resolveVersion(routeParams.versionUri, urlVersionNum);
    const category = routeParams.categoryUri || 'global';

    const branch = API_DATA[category];
    const candidate =
        branch && typeof branch[versionUriNum] === 'function'
            ? branch[versionUriNum]
            : null;

    if (candidate) return candidate;

    const fallbackVersion = !Number.isNaN(urlVersionNum)
        ? urlVersionNum
        : versionUriNum;
    return API_DATA.global[fallbackVersion];
};

export const resolveTitle = (
    routeParams,
    globalContent,
    name,
    sectionSource
) => {
    if (routeParams.title != null) return routeParams.title;
    const titleSource = sectionSource || globalContent;
    const fromHierarchy = get(
        titleSource,
        'acumuladoGeneral.hierarchy_navigation',
        null
    );
    return fromHierarchy ?? sectionSource?.name ?? name;
};

export const buildAcuData = ({
    title,
    configuration,
    routeParams,
    elements
}) => {
    const acuData = {
        tipoAcumulado: 1,
        name: title,
        articles: elements.content_elements,
        paginator: elements.next,
        total: elements.count,
        configuration
    };

    if (routeParams.tag != null && routeParams.tag !== '') {
        acuData.tag = routeParams.tag;
    }
    return acuData;
};

export const isDeepPagination = (page, size) =>
    !Number.isNaN(page) &&
    !Number.isNaN(size) &&
    page * size - size > BANNERS_PAGINATION_THRESHOLD;

export const warnIfMissingSectionData = globalContent => {
    const id = get(globalContent, '_id', null);
    const site = get(globalContent, 'site', null);
    const distributorId = get(globalContent, 'distributorId', null);
    if (site || distributorId || id === SECTION_SUSCRIPTORES) return;

    console.warn(
        new BackendLnError(
            `Accumulated - msj: No existe data esperada en el globalContent de Seccion - GlobalContent: ${JSON.stringify(globalContent || {})}`,
            enumTypeError.featureError
        )
    );
};
