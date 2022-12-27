import { AUDIO_NEWS_URL } from 'fusion:environment';
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

    if (!date) {
        throw new Error('El campo date es obligatorio');
    }

    return true;
};

const resolve = key => {
    const { id, date } = key;

    if (isValidStory(id, date)) {
        const formatDate = convertLastUpdated(date);

        return `${AUDIO_NEWS_URL}${formatDate}/${id}/`;
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
