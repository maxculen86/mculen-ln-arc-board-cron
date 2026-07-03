const fetch = query => ({
    message: `This is a mock response for the fooditArticleSource fetch function. query=${JSON.stringify(
        query
    )}`
});

export default {
    fetch,
    params: {
        id: 'text'
    },
    // transform: data => {
    //     return Object.assign(data, { newParam: 'newValue example' });
    // },
    // filter,
    ttl: 600
};
