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
        .sort(function(a, b) {
            if (resizedUrls[a].option.width < resizedUrls[b].option.width) {
                return 1;
            }
            if (resizedUrls[a].option.width === resizedUrls[b].option.width) {
                if (
                    resizedUrls[a].option.height < resizedUrls[b].option.height
                ) {
                    return 1;
                }
                return -1;
            }
            return -1;
        })
        .map(key =>
            resp.parametros.push({
                ancho: resizedUrls[key].option.width,
                firma: resizedUrls[key].resizedUrl.match(signatureRegex)
                    ? resizedUrls[key].resizedUrl.replace(signatureRegex, '$1')
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

export default imageCommon;
