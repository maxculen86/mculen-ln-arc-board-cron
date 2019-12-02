const imageCommon = image => {
    const { _id: id, resized_urls: resizedUrls } = image;
    if (!resizedUrls || resizedUrls.length === 0) return null;
    return {
        _t: 'img',
        id,
        src: resizedUrls[0].resizedUrl
    };
};

export default imageCommon;
