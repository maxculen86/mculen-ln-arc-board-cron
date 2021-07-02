const imageCommon = image => {
    if (!image) return null;
    const { _id: id, resized_urls: resizedUrls } = image;
    if (!resizedUrls || resizedUrls.length === 0) return null;
    const newRegex = /.*\/resizer\/([a-zA-Z0-9_\-=]+\/[0-9x]+(?:\/smart)?(?:\/+(?:filters:.+?)?)?)\/.*/;
    const absoluteUrl = resizedUrls[0].resizedUrl.replace(
        newRegex,
        (str, match) => {
            return str.replace(match, '{{param}}');
        }
    );
    const i = 0;
    const hrefRegex = new RegExp(
        /\/resizer\/([a-zA-Z0-9_\-=]+\/[0-9x]+(?:\/smart)?(?:\/+(?:filters:.+?)?)?)\/.*/
    );
    const regexResult = hrefRegex.exec(resizedUrls[0].resizedUrl);
    const resp = {
        id,
        _t: 'img',
        baseUrl: regexResult
            ? regexResult[0].replace(regexResult[1], '{{param}}')
            : resizedUrls[0].resizedUrl,
        absoluteUrl: absoluteUrl,
        parametros: []
    };
    const regex = /.*\/resizer\/([a-zA-Z0-9_\-=]+\/[0-9x]+(?:\/smart)?(?:\/+(?:filters:.+?)?)?)\/.*/;
    Object.keys(resizedUrls)
        .sort(function orderPhotos(a, b) {
            const mediaA = parseInt(
                resizedUrls[a].option.media.match(/\d+/)[0],
                10
            );
            const mediaB = parseInt(
                resizedUrls[b].option.media.match(/\d+/)[0],
                10
            );

            orderPattern(mediaA, mediaB);
        })
        .map(key =>
            resp.parametros.push({
                media: parseInt(
                    resizedUrls[key].option.media.match(/\d+/)[0],
                    10
                ),
                ancho: resizedUrls[key].option.width,
                firma: resizedUrls[key].resizedUrl.match(regex)
                    ? resizedUrls[key].resizedUrl.replace(regex, '$1')
                    : ''
            })
        );
    return resp;
};

export const getImageUrl = url => {
    const hrefRegex = new RegExp(
        /\/resizer\/([a-zA-Z0-9_\-=]+\/[0-9x]+(?:\/smart)?(?:\/+(?:filters:.+?)?)?)\/.*/
    );
    return hrefRegex.exec(url);
};

const orderPattern = (a, b) => {
    if (a < b) {
        return 1;
    }
    if (a === b) {
        if (a < b) {
            return 1;
        }
        return -1;
    }
    return -1;
};

export default imageCommon;
