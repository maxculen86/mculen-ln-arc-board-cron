import { LANACION_ECONOMIC_URL } from 'fusion:environment';
import logger from '../../../../../components/private/common/utils/logger';
import { handleHttpError } from '../../../../../components/private/common/utils/handleHttpError';
import { getEconomicIndicesMetaData, VALID_SERVICE_ITEMS } from './_helpers';

const ENDPOINTS = {
    merval: `${LANACION_ECONOMIC_URL}/acciones_merval.json`,
    etf: `${LANACION_ECONOMIC_URL}/etf.json`,
    bonos: `${LANACION_ECONOMIC_URL}/bonos.json`,
    adrs: `${LANACION_ECONOMIC_URL}/adrs.json`,
    cedears: `${LANACION_ECONOMIC_URL}/cedears.json`,
    'riesgo-pais': `${LANACION_ECONOMIC_URL}/indices_monedas.json`
};

const getUri = ({ serviceItem = '' }) => {
    if (serviceItem && ENDPOINTS[serviceItem]) {
        return ENDPOINTS[serviceItem];
    }
    throw new Error(`El índice económico "${serviceItem}" no existe.`);
};

const economicIndicesRequest = async ({ queryData } = {}) => {
    const { serviceItem = '' } = queryData;
    const uri = getUri(queryData);

    try {
        const response = await global.fetch(uri, {
            method: 'GET'
        });

        handleHttpError(response);
        const data = await response.json();

        return {
            tableType: serviceItem,
            ...data
        };
    } catch (error) {
        logger.push(
            error,
            {
                source: 'content/sources/servicesSource/economicIndices',
                url: uri
            },
            queryData.arcSite
        );
        return {};
    }
};

const transform = data => {
    const { serviceType, dataService, sectionSourceData, serviceItem } = data;

    return {
        serviceType,
        serviceItem,
        ...sectionSourceData,
        dataService,
        metaData: getEconomicIndicesMetaData(serviceItem)
    };
};

const resolve = ({ response = {} }) => transform(response);

const reject = ({ error, uri, arcSite }) => {
    logger.push(
        error,
        { source: 'content/sources/servicesSource/economicIndices', url: uri },
        arcSite
    );
};

const getTemplates = serviceItem =>
    VALID_SERVICE_ITEMS.includes(serviceItem) && 'detalle-indices';

export default {
    getUri,
    request: economicIndicesRequest,
    resolve,
    transform,
    reject,
    getTemplates
};
