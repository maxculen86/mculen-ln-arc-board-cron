import { handleHttpError } from '../../components/private/common/utils/handleHttpError';
import logger from '../../components/private/common/utils/logger';

const fetch = query => {
    const { playlistId } = query;
    const resolveData = async () => {
        try {
            const response = await global.fetch(
                `https://cdn.jwplayer.com/v2/playlists/${playlistId}`
            );
            handleHttpError(response);
            return await response.json();
        } catch (error) {
            console.warn(
                `content/jwPlaylistSource Error: ${JSON.stringify(
                    query
                )} - errorMsj:${error.message}`
            );
            logger.push(error, {
                source: 'content/sources/jwPlaylistSource',
                query
            });

            return {};
        }
    };

    return resolveData();
};

export default {
    fetch,
    params: {
        playlistId: 'text'
    },
    ttl: 120
};
