import get from './get';

export default function getVideosHelper(cached, fetched, handleVideosChange) {
    const cachedVideos = get(cached, 'content_elements', null);

    if (cachedVideos) handleVideosChange(cachedVideos);

    fetched.then(response => {
        const fetchedVideos = get(response, 'content_elements', null);
        if (fetchedVideos) handleVideosChange(fetchedVideos);
    });
}
