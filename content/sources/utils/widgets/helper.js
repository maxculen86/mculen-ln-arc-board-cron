export const getDataFromQuery = (query = {}) => {
    const { uri = '', 'arc-site': arcSite = 'la-nacion-ar' } = query;
    const [, widget, ...params] = uri.split('/').filter(String);
    return {
        uri,
        widget,
        params,
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
