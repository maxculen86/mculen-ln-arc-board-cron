const imageCommon = image => {
    if (!image) return null;

    const { _id: id, resized_urls: resizedUrls } = image;
    if (!resizedUrls || resizedUrls.length === 0) return null;
    return {
        _t: 'img',
        id,
        src: resizedUrls[0].resizedUrl,
        alto: resizedUrls[0].option.height,
        ancho: resizedUrls[0].option.width
    };
};

export default imageCommon;
