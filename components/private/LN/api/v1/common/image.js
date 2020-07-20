const imageCommon = image => {
    if (!image) return null;
    const { _id: id, resized_urls: resizedUrls } = image;
    if (!resizedUrls || resizedUrls.length === 0) return null;

    const regex = /.*\/resizer\/([a-zA-Z0-9_\-=]+\/[0-9x]+)\/.*/;
    const baseUrl = resizedUrls[0].resizedUrl.replace(regex, (str, match) => {
        return str.replace(match, '{{param}}');
    });

    const resp = {
        id,
        _t: 'img',
        baseUrl,
        parametros: []
    };

    resizedUrls.forEach(e => {
        resp.parametros.push({
            ancho: e.option.width,
            firma: e.resizedUrl.replace(regex, '$1')
        });
    });

    return resp;
};

export default imageCommon;
