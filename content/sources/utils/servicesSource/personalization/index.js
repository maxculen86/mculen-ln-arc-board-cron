import { PERSONALIZACION_API } from 'fusion:environment';
import request from 'request-promise-native';
import get from '../../../../../components/private/common/utils/get';
import logger from '../../../../../components/private/common/utils/logger';

const ACCEPTED_TYPES = ['autor', 'seccion', 'tag', 'author', 'section'];

//TODO: Configurar url Global para personalizacion
//TODO: Configurar size por defecto y order (No es el mismo size que recibe el content source)

const getUri = query => {
    const { sizeFollow: size = 50 } = query;
    return `${PERSONALIZACION_API}topics?size=${size}&sort=date`;
};

const requestFollowedItem = async query => {
    const {
        uri = '',
        token,
        source = 'personalizationSource',
        'arc-site': arcSite = 'la-nacion-ar'
    } = query;

    const opt = {
        uri: getUri(query),
        json: true,
        method: 'GET',
        headers: {
            Authorization: token
        }
    };

    return request(opt)
        .then(res => {
            const data = get(res, 'data', []);
            return transform(data);
        })
        .catch(error => reject({ error, uri, arcSite, source }));
};

const reject = ({ error, uri, arcSite, source }) => {
    logger.push(error, { source, url: uri }, arcSite);
};
const transform = response =>
    response.reduce((acc, topic) => {
        const type = get(topic, 'topicType', '');
        const content = get(topic, 'topicContent', '');
        if (ACCEPTED_TYPES.includes(type) && content && content.slug) {
            acc.push({
                type,
                ...content
            });
        }
        return acc;
    }, []);

export default {
    request: requestFollowedItem
};
