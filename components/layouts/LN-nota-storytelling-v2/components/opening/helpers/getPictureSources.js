const DEFAULT_MOBILE_MAX_WIDTH = 767;

const getMaxWidthFromSizes = sizes => {
    const maxWidthMatches = String(sizes || '').match(/max-width:\s*\d+px/g);

    if (!maxWidthMatches) return DEFAULT_MOBILE_MAX_WIDTH;

    return Math.max(
        ...maxWidthMatches.map(match => Number(match.match(/\d+/)[0]))
    );
};

const getPictureSources = ({
    src,
    srcset,
    sizes,
    mobileSrc,
    mobileSrcset,
    mobileSizes
}) => {
    const mobileMaxWidth = getMaxWidthFromSizes(mobileSizes);

    return [
        {
            minWidth: mobileMaxWidth + 1,
            srcSet: srcset || src,
            sizes
        },
        {
            maxWidth: mobileMaxWidth,
            srcSet: mobileSrcset || mobileSrc,
            sizes: mobileSizes
        }
    ];
};

export default getPictureSources;
