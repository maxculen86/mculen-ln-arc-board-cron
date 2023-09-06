import { SITE_LANACION } from 'fusion:environment';
import get from '../../components/private/common/utils/get';
import pages from './utils/pageSource/index';
import jsonSectionsInPages from './utils/pageSource/pageAcumulados/config/configSectionPage.json';
import transform from './utils/pageSource/pageAcumulados/v2/mobile/transform';
import home from '../../components/private/LN/api/v2/mobile/homeAccumulated';
import pageTransformV2Format from './utils/pageSource/acumulados/v2/mobile/bySection/pageTransformV2Format';

const fetch = async (query, { cachedCall }) => {
    try {
        const {
            uri,
            website,
            versionUri,
            ticksCache,
            categoryUri,
            sectionData,
            sectioninPage
        } = getParamsFromQuery(query);

        const queryParams = {
            rootPath: `${SITE_LANACION}/${sectioninPage}`,
            ticksCache: ticksCache.toString(),
            website,
            uri,
            title: sectioninPage,
            categoryUri,
            versionUri
        };

        const resultPage = await cachedCall('ApiPageAcumulados', pages.fetch, {
            query: queryParams,
            ttl: 120
        });

        // Para revisar la data cruda que viene del Layout
        //return resultPage;
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
        return pageTransformV2Format(resultPageData, sectionData);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error in content/apiPageAcumuladoSource : 
            query parameters: ${JSON.stringify(query)} 
            - errorMsj: ${error.message}`
        );
        throw new Error(error);
    }
};

const getParamsFromQuery = query => {
    const { uri = '', website, versionUri } = query;
    const ticksCache = get(query, 'ticks', '').replace('/', '');
    const categoryUri = get(query, 'categoryUri', '').replace('/', '');

    const sectionId = get(query, 'sectionId', '').replace('/', '');

    const sectionData = jsonSectionsInPages?.find(
        e => e.sectionId === sectionId
    );

    const sectioninPage =
        sectionData && sectionData.namePage ? sectionData.namePage : sectionId;

    if (!versionUri) {
        throw new Error('The api page must have a version');
    }

    return {
        uri,
        website,
        versionUri,
        ticksCache,
        categoryUri,
        sectionData,
        sectioninPage
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
