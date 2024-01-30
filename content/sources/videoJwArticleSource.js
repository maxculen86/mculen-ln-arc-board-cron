import request from 'request-promise-native';
import logger from '../../components/private/common/utils/logger';

const fetch = query => {
    const { idVideoArc = '' } = query;

    const urlSearchIdJw = `https://videomapper.lanacion.com.ar/video/${idVideoArc}`;

    return request(urlSearchIdJw, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'Fwm2XQ4Llr6dwzu08V6xT8cZuNuKVrd28RAYUJhV'
        }
    })
        .then(response => {
            const { video_id: idJw } = JSON.parse(response);
            const getMediaJw = `https://cdn.jwplayer.com/v2/media/${idJw}`;
            return request(getMediaJw);
        })
        .then(jwObject => {
            return {
                embed: { config: { videoJw: { ...JSON.parse(jwObject) } } },
                _id: idVideoArc,
                type: 'custom_embed',
                subtype: 'video_jw'
            };
        })
        .catch(error => {
            if (error.statusCode === 404) {
                logger.push(
                    error,
                    {
                        source:
                            'content/source/articleSourceNota/convertVideoArcToJw/notConverted',
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
                    source:
                        'content/source/articleSourceNota/convertVideoArcToJw',
                    url: idVideoArc
                },
                query['arc-site'],
                true
            );
        });
};

export default {
    fetch,
    params: {
        idVideoArc: 'text',
        website: 'text'
    },
    ttl: 900
};
