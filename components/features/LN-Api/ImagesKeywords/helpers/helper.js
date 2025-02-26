export const PHOTOCENTER_LIMIT = 100;
const updateUrl = url => {
    const regex = /\/(\d+)\/?$/;

    if (regex.test(url)) {
        return url.replace(
            regex,
            (_, number) =>
                `/${parseInt(number, 10) + PHOTOCENTER_LIMIT}/?outputType=json`
        );
    }
    return url.endsWith('/')
        ? `${url}${PHOTOCENTER_LIMIT}/?outputType=json`
        : `${url}/${PHOTOCENTER_LIMIT}/?outputType=json`;
};

export const getKeywords = query =>
    decodeURIComponent(query.keywords).split(',');

export const getNextUri = query => updateUrl(query.uri);
