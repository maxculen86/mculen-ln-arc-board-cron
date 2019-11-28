const imageCommon = image => {
    const { _id: id, resized_urls: resizedUrls } = image;

    return {
        id,
        src: resizedUrls[0].resizedUrl
    };
};

export default imageCommon;
