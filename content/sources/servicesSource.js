import { ARC_ACCESS_TOKEN, CONTENT_BASE } from 'fusion:environment';
import request from 'request-promise-native';
import { resolve as sectionSourceResolve } from './sectionSource';
import defaultWidget from './utils/widgets/defaultWidget';
import { getAuthForRequest } from './utils/widgets/helper';

const getRequest = query => {
    const opt = {
        uri: query,
        json: true
    };
    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }
    return request(opt).then(data => data);
};

const SERVICES = {
    loterias: defaultWidget,
    default: defaultWidget
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

    const { request: serviceRequest, resolve, reject, transform, getUri } =
        SERVICES[service] || SERVICES.default;

    return serviceRequest({
        queryData: query,
        getUri,
        auth: getAuthForRequest(ARC_ACCESS_TOKEN)
    })
        .then(response =>
            resolve({
                response: {
                    ...sectionSourceData,
                    dataService: response,
                    serviceType: serviceItem
                        ? `detalle-${service}`
                        : `home-${service}`
                },
                transform,
                query
            })
        )
        .catch(error => {
            return reject({ error, uri, arcSite });
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
