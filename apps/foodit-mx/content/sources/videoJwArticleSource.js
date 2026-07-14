import logger from '../../components/private/common/utils/logger';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';

const fetch = query => {
    const { idVideoArc = '', video } = query;

    const urlSearchIdJw = `https://videomapper.lanacion.com.ar/video/${idVideoArc}`;

    const resolveData = async () => {
        try {
            const opt = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'Fwm2XQ4Llr6dwzu08V6xT8cZuNuKVrd28RAYUJhV'
                }
            };
            const response = await global.fetch(urlSearchIdJw, opt);
            handleHttpError(response);
            const data = await response.json();
            const getMediaJwUri = `https://cdn.jwplayer.com/v2/media/${data.video_id}`;
            const jwResponse = await global.fetch(getMediaJwUri);
            handleHttpError(jwResponse);
            const jwObject = await jwResponse.json();
            return {
                embed: { config: { videoJw: jwObject } },
                _id: idVideoArc,
                type: 'custom_embed',
                subtype: 'video_jw'
            };
        } catch (error) {
            if (error.statusCode === 404) {
                logger.push(
                    error,
                    {
                        source: 'content/source/articleSourceNota/convertVideoArcToJw/notConverted',
                        url: idVideoArc
                    },
                    query['arc-site'],
                    true
                );
                return video;
            }

            return logger.push(
                error,
                {
                    source: 'content/source/articleSourceNota/convertVideoArcToJw',
                    url: idVideoArc
                },
                query['arc-site'],
                true
            );
        }
    };
    return resolveData();
};

export default {
    fetch,
    params: {
        idVideoArc: 'text',
        website: 'text'
    },
    ttl: 900
};
