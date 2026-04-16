export const getVideoJwDataHome = videoData => {
    const { playlist = [] } = videoData;
    const [
        {
            sources = [],
            image,
            images = [],
            mediaid,
            title = 'Video sin título',
            tracks = [],
            duration
        } = {}
    ] = playlist;

    return {
        sources,
        poster: image,
        image,
        images,
        mediaid,
        title,
        tracks,
        duration
    };
};
