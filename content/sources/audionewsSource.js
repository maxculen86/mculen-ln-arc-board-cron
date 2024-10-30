import { AUDIONEWS_URL, AUDIONEWS_APIKEY } from 'fusion:environment';
import request from 'request-promise-native';
import logger from '../../components/private/common/utils/logger';
import { enumTypeError } from '../../components/private/LN/api/common/enums/enumTypeError';
import { BackendLnError } from '../../components/private/LN/api/common/models/backendLnError';
import { isCustomVoice } from './utils/audioNews/helper';
import get from '../../components/private/common/utils/get';

const isValidStory = id => {
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

            if (get(resp, 'audio_url', null))
                return { ...resp, audio_custom_voice: isCustomVoice(resp) };

            return {};
        })
        .catch(error => {
            console.warn(
                new BackendLnError(
                    `AudionewsSource - msj: ${
                        error.message
                    } - Query: ${JSON.stringify(query || {})}`,
                    enumTypeError.audionewsError
                )
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
