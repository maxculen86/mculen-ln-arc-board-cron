export const getVideoJwDataCarrusel = videoData => {
    const { playlist = [] } = videoData;
    const [{ sources = [], images = [], duration = 0 } = {}] = playlist;
    const [{ src: poster = '' } = {}] = images;

    return {
        sources,
        poster,
        duration
    };
};
