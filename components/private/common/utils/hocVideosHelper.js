import get from 'lodash.get';

export default function getVideosHelper(cached, fetched) {
    const cachedVideos = get(cached, 'content_elements', null);

    if (cachedVideos) this.setState({ videos: cachedVideos });

    fetched.then(response => {
        const fetchedVideos = get(response, 'content_elements', null);
        if (fetchedVideos) this.setState({ videos: fetchedVideos });
    });
}
