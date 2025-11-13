import { AUDIONEWS_URL, AUDIONEWS_APIKEY } from 'fusion:environment';
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

const handleAudioNewsResponse = async (response, query) => {
    if (response.status === 404 || response.status === 500) {
        if (response.status === 404) {
            console.warn(
                JSON.stringify(
                    {
                        name: 'BackendLnWarn',
                        log_details: {
                            message: `No existe el audio para la nota ${query.id}`,
                            reference_id: query.id,
                            type_reference: 'composerId',
                            query
                        }
                    },
                    null,
                    2
                )
            );
            return {};
        }

        throw new Error(
            `Error al obtener el audio de la nota, detalle ${response.body}`
        );
    }
    const jsonResponse = await response.json();

    if (get(jsonResponse, 'audio_url', null))
        return {
            ...jsonResponse,
            audio_custom_voice: isCustomVoice(jsonResponse)
        };

    return {};
};

const fetch = async query => {
    const { url = '' } = query;
    try {
        const opt = {};
        opt.headers = {
            'x-api-key': AUDIONEWS_APIKEY
        };
        const response = await global.fetch(resolve(query), opt);
        return handleAudioNewsResponse(response, query);
    } catch (error) {
        console.warn(
            new BackendLnError(
                `AudionewsSource - msj: ${error.message} - Query: ${JSON.stringify(query || {})}`,
                enumTypeError.audionewsError
            )
        );
        logger.push(error, { source: 'audionewsSource', url });
        return {};
    }
};

export default {
    fetch,
    params: {
        id: 'text'
    },
    ttl: 200
};
