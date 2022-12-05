import logger from '../../../components/private/common/utils/logger';

const defaultRequest = ({ queryData } = {}) =>
    new Promise(_resolve => _resolve(queryData));

const resolve = ({ response } = {}) => response;

const reject = ({ error, uri, arcSite, source } = {}) => {
    logger.push(
        error,
        { source: `content/source/${source}/[defaultRequest]`, url: uri },
        arcSite
    );
};

const getTemplates = () => {
    return '';
};

export default {
    request: defaultRequest,
    resolve,
    reject,
    getTemplates
};
