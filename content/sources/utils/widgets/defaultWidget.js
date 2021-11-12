import logger from '../../../../components/private/common/utils/logger';

const defaultRequest = ({ queryData } = {}) =>
    new Promise(resolve => resolve(queryData));

const resolve = ({ response } = {}) => response;

const reject = ({ error, uri, arcSite } = {}) => {
    logger.push(
        error,
        { source: 'content/source/widgetsSource/[defaultWidget]', url: uri },
        arcSite
    );
};

export default {
    request: defaultRequest,
    resolve,
    reject
};
