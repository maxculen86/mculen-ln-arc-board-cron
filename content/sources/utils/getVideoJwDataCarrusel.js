export const getVideoJwDataCarrusel = videoData => {
    const { playlist = [], title = '' } = videoData;
    const [{ sources = [], images = [], duration = 0 } = {}] = playlist;
    const [{ src: poster = '' } = {}] = images;

    return {
        sources,
        poster,
        duration,
        title
    };
};
