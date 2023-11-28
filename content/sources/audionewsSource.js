import { AUDIONEWS_URL, AUDIONEWS_APIKEY } from 'fusion:environment';
import request from 'request-promise-native';
import logger from '../../components/private/common/utils/logger';

const convertLastUpdated = date => {
    const dateFormated = new Date(date);

    if (isNaN(dateFormated)) {
        throw new Error(
            `El campo date con valor ${date} no es valido para convertir a fecha`
        );
    }

    return dateFormated.getTime();
};

const isValidStory = (id, date) => {
    if (!id) {
        throw new Error('El campo id es obligatorio');
    }

    return true;
};

const resolve = key => {
    const { id } = key;

    if (isValidStory(id)) {
        return `${AUDIONEWS_URL}${id}/`;
    }

    return null;
};

const fetch = query => {
    const { url = '' } = query;
    const opt = {
        json: true
    };

    opt.uri = resolve({
        ...query
    });

    opt.headers = {
        'x-api-key': AUDIONEWS_APIKEY
    };

    return request(opt)
        .then(resp => {
            if (resp.statusCode === 404 || resp.statusCode === 500) {
                throw new Error(
                    `Error al obtener el audio de la nota, detalle ${resp.body}`
                );
            }

            return resp;
        })
        .catch(error => {
            console.error(
                `AudionewsSource - msj: ${
                    error.message
                } - query: ${JSON.stringify(query || {})}`
            );
            logger.push(error, { source: 'audionewsSource', url });
        });
};

export default {
    fetch,
    params: {
        id: 'text',
        date: 'text'
    },
    ttl: 200
};
