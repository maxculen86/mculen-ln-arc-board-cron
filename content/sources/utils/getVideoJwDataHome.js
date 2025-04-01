export const getVideoJwDataHome = videoData => {
    const { playlist = [] } = videoData;
    const [
        {
            sources = [],
            image,
            images = [],
            mediaid,
            title = 'Video sin título',
            tracks = []
        } = {}
    ] = playlist;

    return {
        sources,
        poster: image,
        image,
        images,
        mediaid,
        title,
        tracks
    };
};
