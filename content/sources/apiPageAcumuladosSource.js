import { SITE_LANACION } from 'fusion:environment';
import get from '../../components/private/common/utils/get';
import pages from './utils/pageSource/index';
import transform from './utils/pageSource/pageAcumulados/v2/mobile/transform';
import home from '../../components/private/LN/api/v2/mobile/homeAccumulated';
import pageTransformV2Format from './utils/pageSource/acumulados/v2/mobile/bySection/pageTransformV2Format';
import NotFoundError from './utils/notFoundError';
import sectionSource from './sectionSource';
import sectionsDataJson from './utils/pageSource/pageAcumulados/config/configSectionPage.json';

const getParamsFromQuery = query => {
    const { uri = '', website, versionUri } = query;
    const ticksCache = get(query, 'ticks', null);
    const categoryUri = get(query, 'categoryUri', '')?.replace('/', '');
    const turnOffFlag = get(query, 'apagarApi', '');
    const sectionId = get(query, 'sectionId', null);
    const versionDeploy = get(query, 'versionDeploy', null);
    const cookie = get(query, 'cookie', '');
    const sectionData = sectionsDataJson?.find(
        e => get(e, 'slug') === sectionId
    );
    let namePage = get(sectionData, 'namePage', null);
    namePage = namePage ? '/'.concat(namePage) : sectionId;

    if (!versionUri) {
        throw new Error('The api page must have a version');
    }

    return {
        uri,
        website,
        versionUri,
        ticksCache,
        categoryUri,
        turnOffFlag,
        namePage,
        cookie,
        versionDeploy
    };
};

const fetchSectionSource = async (query, cachedCall) => {
    let sectionSourceResult = null;
    const sectionsTitlesCustom = [
        '/economia/inteligencia-artificial',
        '/economia/IA',
        '/quesale',
        '/que-sale'
    ];

    const queryParams = {
        id: query.sectionId,
        website: query.website,
        api: 'true'
    };

    const sectionData = sectionsDataJson?.find(
        e => get(e, 'slug') === query.sectionId
    );
    if (sectionsTitlesCustom.includes(query.sectionId) && sectionData) {
        return { title: sectionData.aliasTitle };
    }

    sectionSourceResult = await cachedCall(
        'sectionSource',
        sectionSource.fetch,
        {
            query: queryParams
        }
    );

    const title = get(
        sectionSourceResult,
        'acumuladoGeneral.hierarchy_navigation',
        get(sectionSourceResult, 'name', null)
    );

    return { title };
};

const fetch = async (query, { cachedCall }) => {
    try {
        const {
            uri,
            website,
            versionUri,
            categoryUri,
            turnOffFlag,
            namePage,
            cookie,
            versionDeploy
        } = getParamsFromQuery(query);

        if (turnOffFlag && turnOffFlag === 'true') {
            return {
                metadata: {},
                items: []
            };
        }

        const queryParams = {
            rootPath: `${SITE_LANACION}${namePage}`,
            website,
            uri,
            categoryUri,
            versionUri,
            cookie,
            versionDeploy
        };

        const [resultPage, fetchSectionSourceResult] = await Promise.all([
            cachedCall('ApiPageAcumulados', pages.fetch, {
                query: queryParams,
                ttl: 300
            }),
            fetchSectionSource(query, cachedCall)
        ]);

        let { title } = fetchSectionSourceResult;

        if (query.sectionId === '/suscriptores') {
            title = 'Suscriptores';
        }

        // Para revisar la data cruda que viene del Layout
        // return resultPage;
        const { information } = resultPage;

        const resultPageTransform = await transform(resultPage);

        // Para revisar la data formateada con la informacion de todas la secciones
        // return resultPageTransform;
        queryParams.information = information;
        const resultHomeTransformation = home(resultPageTransform, queryParams);

        // Para revisar la data despues del transform, estructura final
        const resultPageData = Array.isArray(resultHomeTransformation)
            ? resultHomeTransformation[0]
            : {};
        return pageTransformV2Format(resultPageData, {
            title,
            slug: query.sectionId
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error in content/apiPageAcumuladoSource : 
            query parameters: ${JSON.stringify(query)} 
            - errorMsj: ${error.message}`
        );

        if (error instanceof NotFoundError) {
            throw new NotFoundError(
                `seccion no encontrada: ${query.sectionId}`
            );
        }
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
        apagarApi: 'text',
        versionDeploy: 'text'
    },
    ttl: 120
};
