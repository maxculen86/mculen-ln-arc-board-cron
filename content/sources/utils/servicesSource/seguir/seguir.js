import request from 'request-promise-native';
import get from '../../../../../components/private/common/utils/get';
import logger from '../../../../../components/private/common/utils/logger';

const TOPICS = {
    authors: 'autor',
    sections: 'seccion',
    tags: 'tags'
};

const getUri = token => {
    if (!token) throw new Error('Debe definir el Token del usuario');
    return `https://qa-api-personalizacion.lanacion.com.ar/v1/zones/lanacion/topics?size=50&sort=date`;
};

const requestFollowedItem = ({ token } = {}) => {
    const opt = {
        uri: getUri(token),
        json: true,
        header: {
            Authorization: token
        }
    };
    return request(opt).then(data => data);
};

const resolve = ({ response = {} }) => transform(response);

const reject = ({ error, uri, arcSite }) => {
    logger.push(error, { source: 'serviceSource', url: uri }, arcSite);
};

const transform = response => {
    const data = get(response, 'data', null);
    if (!data || !data.length) return null;

    Object.keys(data).reduce((prev, topic) => {}, []);
};
