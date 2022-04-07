import { ARC_ACCESS_TOKEN, CONTENT_BASE } from 'fusion:environment';
import { resolve as sectionSourceResolve } from './sectionSource';
import defaultRequest from './utils/defaultRequest';
import lottery from './utils/servicesSource/lottery/lottery';
import getRequest from './utils/getRequest';
import { getAuthForRequest } from './utils/widgets/helper';
import NotFoundError from './utils/notFoundError';

const SERVICES = {
    loterias: lottery,
    default: defaultRequest
};

const fetch = async (query, { cachedCall }) => {
    const {
        id = '',
        service = '',
        serviceItem = '',
        uri = '',
        'arc-site': arcSite = 'la-nacion-ar'
    } = query;

    const sectionSourceData = await cachedCall('sectionSource', getRequest, {
        query: `${CONTENT_BASE}${sectionSourceResolve(query)}`
    });

    const { request: serviceRequest, resolve, reject } =
        SERVICES[service] || SERVICES.default;

    const { _id: sectionSourceId } = sectionSourceData;

    if (sectionSourceId !== id) {
        throw new NotFoundError(
            `La sección '${id}' que intenta consultar no existe`
        );
    }

    return serviceRequest({
        queryData: query,
        auth: getAuthForRequest(ARC_ACCESS_TOKEN)
    })
        .then(response =>
            resolve({
                response: {
                    sectionSourceData,
                    dataService: response,
                    serviceType: serviceItem
                        ? `detalle-${service}`
                        : `home-${service}`
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
        website: 'text',
        outputType: 'text',
        redirectUrl: 'text',
        meteringVariant: 'text'
    },
    ttl: 120
};
