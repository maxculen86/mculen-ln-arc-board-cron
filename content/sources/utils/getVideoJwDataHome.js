export const getVideoJwDataHome = videoData => {
    const { playlist = [] } = videoData;
    const [{ sources = [], images: [{ src } = {}] = [] } = {}] = playlist;
    return {
        sources,
        poster: src
    };
};
