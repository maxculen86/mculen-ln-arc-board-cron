import { CONTENT_BASE } from 'fusion:environment';
import { resolve as sectionSourceResolve } from './sectionSource';
import defaultRequest from './utils/defaultRequest';
import lottery from './utils/servicesSource/lottery/lottery';
import weather from './utils/servicesSource/weather/weather';
import holidays from './utils/servicesSource/holidays/holidays';
import horoscope from './utils/servicesSource/horoscope/horoscope';
import economicIndices from './utils/servicesSource/economicIndices/economicIndices';
import getRequest from './utils/getRequest';
import NotFoundError from './utils/notFoundError';
import filter from '../filters/LN/services/filter';

const SERVICES = {
    loterias: lottery,
    clima: weather,
    feriados: holidays,
    horoscopo: horoscope,
    economia: economicIndices,
    default: defaultRequest
};

const sections = ['horoscopo', 'economia'];

const fetch = async (query, { cachedCall }) => {
    const {
        id = '',
        service = '',
        serviceItem = '',
        serviceSubItem = '',
        uri = '',
        'arc-site': arcSite = 'la-nacion-ar'
    } = query;

    const sectionSourceData = !sections.includes(service)
        ? await cachedCall('sectionSource', getRequest, {
              query: `${CONTENT_BASE}${sectionSourceResolve(query)}`,
              independent: true
          })
        : {};

    const {
        request: serviceRequest,
        resolve,
        reject,
        getTemplates
    } = SERVICES[service] || SERVICES.default;

    const { _id: sectionSourceId = '', children: sectionChildrens = [] } =
        sectionSourceData;

    if (service !== 'economia' && sectionSourceId !== id) {
        throw new NotFoundError(
            `La sección '${id}' que intenta consultar no existe`
        );
    }

    return serviceRequest({
        queryData: query,
        sectionChildrens
    })
        .then(response =>
            resolve({
                response: {
                    sectionSourceData,
                    serviceItem,
                    serviceSubItem,
                    dataService: response,
                    serviceType: getTemplates(
                        serviceItem,
                        serviceSubItem,
                        sectionChildrens
                    )
                },
                query
            })
        )
        .catch(error =>
            reject({ error, uri, arcSite, source: 'servicesSource' })
        );
};

export default {
    fetch,
    params: {
        id: 'text',
        service: 'text',
        serviceItem: 'text',
        serviceSubItem: 'text',
        website: 'text',
        outputType: 'text',
        redirectUrl: 'text',
        meteringVariant: 'text'
    },
    filter,
    ttl: 120
};
