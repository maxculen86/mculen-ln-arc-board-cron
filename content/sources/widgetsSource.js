import { ARC_ACCESS_TOKEN } from 'fusion:environment';
import defaultRequest from './utils/defaultRequest';
import { getAuthForRequest, getDataFromQuery } from './utils/widgets/helper';
import viafoura from './utils/widgets/viafoura';

const WIDGET_LIST = { defaultRequest, viafoura };

const fetch = (query, { cachedCall }) => {
    const queryData = getDataFromQuery(query);
    const { widget, uri, arcSite } = queryData;
    const { request, resolve, reject, transform, getUri } =
        WIDGET_LIST[widget] || WIDGET_LIST.defaultRequest;

    return request({
        queryData,
        getUri,
        auth: getAuthForRequest(ARC_ACCESS_TOKEN),
        cachedCall
    })
        .then(response =>
            resolve({
                response,
                transform,
                query: queryData
            })
        )
        .catch(error => {
            return reject({ error, uri, arcSite, source: 'widgetsSource' });
        });
};

export default {
    fetch,
    params: {
        uri: 'text',
        id: 'text'
    },
    ttl: 300
};
