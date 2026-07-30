function normalizeDurationSeconds(value) {
    if (typeof value === 'string') {
        const ms = parseInt(value, 10);
        return Number.isNaN(ms) ? 0 : Math.floor(ms / 1000);
    }

    if (typeof value === 'number') {
        return value;
    }

    return 0;
}

export const getVideoJwDataCarrusel = videoData => {
    const { playlist = [], title = '' } = videoData;
    const [{ sources = [], images = [], duration = 0 } = {}] = playlist;
    const [{ src: poster = '' } = {}] = images;

    return {
        sources,
        poster,
        duration: normalizeDurationSeconds(duration),
        title
    };
};
