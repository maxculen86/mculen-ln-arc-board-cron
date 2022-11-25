import pages from './utils/servicesSource/pages';

const fetch = async query => {
    try {
        const now = new Date();
        const ticks = now.getTime();
        const queryParams = {
            ticksCache: ticks.toString(),
            website: query?.website
        };
        return await pages.fetch(queryParams);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error content/apiHomeSource : ${JSON.stringify(
                query
            )} - errorMsj:${error.message}`
        );
        throw new Error(error);
    }
};

export default {
    fetch,
    params: {
        website: 'text',
        ticks: 'text'
    },
    ttl: 120
};
