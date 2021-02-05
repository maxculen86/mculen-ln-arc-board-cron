const imageCommon = image => {
    if (!image) return null;
    const { _id: id, resized_urls: resizedUrls } = image;
    if (!resizedUrls || resizedUrls.length === 0) return null;

    // const regex = /.*\/resizer\/([a-zA-Z0-9_\-=]+\/[0-9x]+(?:\/smart)?(?:\/+(?:filters:.+?)?)?)\/.*/;
    // const baseUrl = resizedUrls[0].resizedUrl.replace(regex, (str, match) => {
    //     return str.replace(match, '{{param}}');
    // });

    const hrefRegex = new RegExp(
        /\/resizer\/([a-zA-Z0-9_\-=]+\/[0-9x]+(?:\/smart)?(?:\/+(?:filters:.+?)?)?)\/.*/
    );
    const regexResult = hrefRegex.exec(resizedUrls[0].resizedUrl);

    const resp = {
        id,
        _t: 'img',
        baseUrl: regexResult[0].replace(regexResult[1], '{{param}}'),
        parametros: []
    };

    const regex = /.*\/resizer\/([a-zA-Z0-9_\-=]+\/[0-9x]+(?:\/smart)?(?:\/+(?:filters:.+?)?)?)\/.*/;
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
                firma: resizedUrls[key].resizedUrl.match(regex)
                    ? resizedUrls[key].resizedUrl.replace(regex, '$1')
                    : ''
            })
        );

    return resp;
};

export default imageCommon;
