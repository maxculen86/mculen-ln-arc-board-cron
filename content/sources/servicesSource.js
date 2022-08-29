import { ARC_ACCESS_TOKEN, CONTENT_BASE } from 'fusion:environment';
import { resolve as sectionSourceResolve } from './sectionSource';
import defaultRequest from './utils/defaultRequest';
import lottery from './utils/servicesSource/lottery/lottery';
import weather from './utils/servicesSource/weather/weather';
import getRequest from './utils/getRequest';
import { getAuthForRequest } from './utils/widgets/helper';
import NotFoundError from './utils/notFoundError';
import force404AMP from './utils/force404AMP';

const SERVICES = {
    loterias: lottery,
    clima: weather,
    default: defaultRequest
};

const fetch = async (query, { cachedCall }) => {
    const {
        id = '',
        service = '',
        serviceItem = '',
        serviceSubItem = '',
        uri = '',
        'arc-site': arcSite = 'la-nacion-ar',
        outputType = ''
    } = query;

    const sectionSourceData = await cachedCall('sectionSource', getRequest, {
        query: `${CONTENT_BASE}${sectionSourceResolve(query)}`
    });

    const { request: serviceRequest, resolve, reject, getTemplates } =
        SERVICES[service] || SERVICES.default;

    const {
        _id: sectionSourceId,
        children: sectionChildrens
    } = sectionSourceData;

    if (sectionSourceId !== id) {
        throw new NotFoundError(
            `La sección '${id}' que intenta consultar no existe`
        );
    }

    force404AMP({ outputType });

    return serviceRequest({
        queryData: query,
        auth: getAuthForRequest(ARC_ACCESS_TOKEN),
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
        .catch(error => {
            return reject({ error, uri, arcSite, source: 'servicesSource' });
        });
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
    ttl: 120
};
