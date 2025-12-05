import Consumer from 'fusion:consumer';

export const getSizeParam = query => {
    const match = /size:(\d+)/.exec(query);
    return match ? Number(match[1]) : 30;
};

export const getPageParam = query => {
    const match = /page:(-?\d+)/.exec(query);
    const page = match ? Number(match[1]) : 1;

    if (page < 1) {
        throw new Error('Page parameter must be >= 1');
    }

    return page;
};

class Podcast {
    constructor(props) {
        this.props = props;
    }

    render() {
        try {
            const { globalContent, globalContentConfig } = this.props;
            if (!globalContent) {
                throw new Error('globalContent is null or undefined');
            }
            const uri = globalContentConfig?.query?.uri ?? '';

            const size = getSizeParam(uri);
            const page = getPageParam(uri);

            const startIndex = (page - 1) * size;
            const endIndex = startIndex + size;

            const episodes = globalContent.slice(startIndex, endIndex);

            const response = {
                totalEpisodes: globalContent.length,
                episodesPerPage: size,
                totalPages: Math.ceil(globalContent.length / size),
                currentPage: page,
                nextPage: endIndex < globalContent.length ? page + 1 : null,
                episodes: episodes || []
            };

            return response;
        } catch (err) {
            return { success: false, message: err.message };
        }
    }
}

export default Consumer(Podcast);
