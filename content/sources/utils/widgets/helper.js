export const getDataFromQuery = (query = {}) => {
    const {
        uri = '',
        'arc-site': arcSite = 'la-nacion-ar',
        ...queryParams
    } = query;

    const [, widget, ...params] = uri.split('/').filter(String);
    return {
        uri,
        widget,
        params,
        queryParams,
        arcSite
    };
};

export const getAuthForRequest = token =>
    (token && {
        auth: {
            bearer: token
        }
    }) ||
    {};
