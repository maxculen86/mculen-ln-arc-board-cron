import logger from '../../components/private/common/utils/logger';
import { getVideoJwDataCarrusel } from './utils/getVideoJwDataCarrusel';

const FETCH_TIMEOUT_MS = 8000;

const transform = (videoData, posterVideo) => {
    const videoJwData = getVideoJwDataCarrusel(videoData);
    return {
        ...videoJwData,
        posterVideo
    };
};

const fetch = async (query = {}) => {
    const { id = '' } = query;
    const baseUrl = `https://cdn.jwplayer.com/v2/media/${id}`;
    const videoController = new AbortController();
    const posterController = new AbortController();
    const videoTimeout = setTimeout(
        () => videoController.abort(),
        FETCH_TIMEOUT_MS
    );
    const posterTimeout = setTimeout(
        () => posterController.abort(),
        FETCH_TIMEOUT_MS
    );

    try {
        const [videoResponse, posterResponse] = await Promise.all([
            global.fetch(baseUrl, { signal: videoController.signal }),
            global.fetch(`${baseUrl}/poster.mp4`, {
                signal: posterController.signal
            })
        ]);

        if (!videoResponse.ok) {
            throw new Error(
                `videosJwCarruselSource media request failed: ${videoResponse.status} ${videoResponse.statusText}`
            );
        }
        if (!posterResponse.ok) {
            throw new Error(
                `videosJwCarruselSource poster request failed: ${posterResponse.status} ${posterResponse.statusText}`
            );
        }

        const videoData = await videoResponse.json();
        const posterVideo = posterResponse.url || null;

        return transform(videoData, posterVideo);
    } catch (error) {
        const normalizedError =
            error?.name === 'AbortError'
                ? new Error(
                      `videosJwCarruselSource fetch aborted after ${FETCH_TIMEOUT_MS}ms`
                  )
                : error;
        logger.push(normalizedError, {
            source: 'content/sources/videosJwCarruselSource',
            id,
            message: 'Failed to fetch video data'
        });
        throw normalizedError;
    } finally {
        clearTimeout(videoTimeout);
        clearTimeout(posterTimeout);
    }
};

export default {
    fetch,
    params: {
        id: 'text',
        url: 'text',
        website: 'text'
    },
    ttl: 900
};
