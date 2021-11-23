import { CONTENT_BASE } from 'fusion:environment';
import request from 'request-promise-native';
import logger from '../../../../components/private/common/utils/logger';

const getUri = (query = {}) => {
    const { params: [_id] = [], arcSite = 'la-nacion-ar' } = query;
    const basePath = `${CONTENT_BASE}/content/v4/stories/?website=${arcSite}`;
    if (_id)
        return `${basePath}&_id=${_id}&published=true&included_fields=headlines,canonical_url`;
    throw new Error('Debe definir url o id para obtener la nota');
};

const viafouraRequest = ({ queryData, getUri: getApiUri, auth } = {}) =>
    request({
        uri: getApiUri(queryData),
        json: true,
        ...auth
    });

const resolve = ({ response = {}, query = {} } = {}) => {
    const { params = [] } = query;
    const [_id = '', messageType = ''] = params;
    return { ...response, ...query, _id, messageType };
};

const reject = ({ error, uri, arcSite }) => {
    logger.push(
        error,
        { source: 'content/source/widgetsSource/[viafoura]', url: uri },
        arcSite
    );
};

export default {
    getUri,
    request: viafouraRequest,
    resolve,
    reject
};
