import pages from './utils/servicesSource/pages';

const fetch = async query => {
    try {
        return await pages.fetch({ query });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error Transform - content/apiHomeSource : ${JSON.stringify(
                query
            )} - errorMsj:${error.message}`
        );
        throw new Error(error);
    }
};

export default {
    fetch,
    params: {
        website: 'text'
    },
    ttl: 120
};
