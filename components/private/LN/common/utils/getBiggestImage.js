import get from '../../../common/utils/get';

const getBiggestImage = basic => {
    const { resized_urls: resizedUrls = [] } = basic || {};
    const imagenFullSize = resizedUrls.reduce(
        (prev, curr) =>
            get(prev, 'option.width', 0) > get(curr, 'option.width', 0)
                ? prev
                : curr,
        {}
    );
    const { resizedUrl, option } = imagenFullSize;
    const { width: bigWidth, height: bigHeight } = option || {};
    return { resizedUrl, bigWidth, bigHeight };
};

export default getBiggestImage;
