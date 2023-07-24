import { PERSONALIZACION_API } from 'fusion:environment';
import request from 'request-promise-native';
import get from '../../../../../components/private/common/utils/get';
import logger from '../../../../../components/private/common/utils/logger';

const ACCEPTED_TYPES = ['autor', 'seccion', 'tag', 'author', 'section'];

const getUri = query => {
    const { sizeFollow: size = 50, version = 1 } = query;
    // const PERSO = 'https://qa-api-personalizacion.lanacion.com.ar/personalizacion/v1/zones/lanacion/';
    const apiPersonalization = `${(PERSONALIZACION_API || '').replace(
        'v1',
        'v'.concat(version.toString())
    )}`;

    return `${apiPersonalization}topics?size=${size}&sort=date`;
};

const getHeaders = query => {
    const { token, version = 1 } = query;
    const tokens = (token || '').split(/\//);

    const headers = {
        '1': {
            Authorization: tokens[0]
        },
        '2': {
            'X-Token': tokens[0],
            Authorization: decodeURI(tokens[1])
        }
    };
    return headers[version.toString()];
};

const requestFollowedItem = async query => {
    const {
        uri = '',
        source = 'personalizationSource',
        'arc-site': arcSite = 'la-nacion-ar'
    } = query;

    const opt = {
        uri: getUri(query),
        json: true,
        method: 'GET',
        headers: getHeaders(query)
    };

    // console.log(opt);

    return request(opt)
        .then(res => {
            const data = get(res, 'data', []);
            return transform(data);
        })
        .catch(error => reject({ error, uri, arcSite, source }));
};

const reject = ({ error, uri, arcSite, source }) => {
    // eslint-disable-next-line no-console
    console.warn(
        `Error Personalization - ${
            typeof error === 'object' ? JSON.stringify(error) : ''
        }`
    );
    logger.push(error, { source, url: uri }, arcSite);
};
const transform = response =>
    response.reduce((acc, topic) => {
        const topicId = get(topic, 'topicId', '');
        const type = get(topic, 'topicType', '');
        const content = get(topic, 'topicContent', '');
        if (ACCEPTED_TYPES.includes(type) && content && content.slug) {
            acc.push({
                type,
                topicId,
                ...content
            });
        }
        return acc;
    }, []);

export default {
    request: requestFollowedItem
};
