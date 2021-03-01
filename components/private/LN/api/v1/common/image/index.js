const imageCommon = image => {
    if (!image) return null;
    const { _id: id, resized_urls: resizedUrls, url: imageUrl } = image;
    if (!resizedUrls || resizedUrls.length === 0) return null;

    const regexResult = getImageUrl(imageUrl);
    const resp = {
        id,
        _t: 'img',
        baseUrl: regexResult
            ? regexResult[0].replace(regexResult[1], '{{param}}')
            : resizedUrls[0].resizedUrl,
        parametros: []
    };

    const signatureRegex = /.*\/resizer\/([a-zA-Z0-9_\-=]+\/[0-9x]+(?:\/smart)?(?:\/+(?:filters:.+?)?)?)\/.*/;
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
                firma: resizedUrls[key].resizedUrl.match(signatureRegex)
                    ? resizedUrls[key].resizedUrl.replace(signatureRegex, '$1')
                    : ''
            })
        );

    return resp;
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
