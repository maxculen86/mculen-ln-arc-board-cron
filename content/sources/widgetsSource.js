import { ARC_ACCESS_TOKEN } from 'fusion:environment';
import { getAuthForRequest, getDataFromQuery } from './utils/widgets/helper';
import viafoura from './utils/widgets/viafoura';
import defaultWidget from './utils/widgets/defaultWidget';

const WIDGET_LIST = { defaultWidget, viafoura };

const fetch = (query, { cachedCall }) => {
    const queryData = getDataFromQuery(query);
    const { widget, uri, arcSite } = queryData;
    const { request, resolve, reject, transform, getUri } =
        WIDGET_LIST[widget] || WIDGET_LIST.defaultWidget;

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
            return reject({ error, uri, arcSite });
        });
};

export default {
    fetch,
    params: {
        uri: 'text'
    },
    ttl: 300
};
