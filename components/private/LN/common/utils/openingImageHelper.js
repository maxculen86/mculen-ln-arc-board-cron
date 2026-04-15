const getAlt = imageData => {
    const { alt_text: altText, caption, titleText } = imageData || {};
    return altText || caption || titleText || '';
};

const getMediaCondition = (option = {}) =>
    option.media_preload || option.media || '';

const getConditionMinWidth = (condition = '') => {
    const match = condition.match(/min-width:\s*([\d.]+)px/i);

    return match ? Number(match[1]) : 0;
};

export const getOpeningImageSizes = (resizedUrls = []) => {
    const sizeEntries = resizedUrls
        .map(({ option = {} }) => {
            const condition = getMediaCondition(option);

            return condition
                ? {
                      condition,
                      minWidth: getConditionMinWidth(condition),
                      width: option.width
                  }
                : null;
        })
        .filter(Boolean)
        .sort((a, b) => b.minWidth - a.minWidth)
        .map(({ condition, width }) => `${condition} ${width}px`);

    const fallbackWidth = resizedUrls[0]?.option?.width;

    if (fallbackWidth) {
        sizeEntries.push(`${fallbackWidth}px`);
    }

    return sizeEntries.join(', ') || undefined;
};

const getResponsiveEntries = (resizedUrls = []) =>
    resizedUrls
        .filter(({ resizedUrl, option: { width } = {} }) => resizedUrl && width)
        .sort(
            (a, b) =>
                Number(a.option?.width || 0) - Number(b.option?.width || 0)
        )
        .filter(
            ({ option: { width } = {} }, index, items) =>
                items.findIndex(
                    item => Number(item.option?.width || 0) === Number(width)
                ) === index
        );

export const buildOpeningImage = imageData => {
    if (!imageData?.url) return null;

    const resizedUrls = getResponsiveEntries(imageData.resized_urls || []);
    const srcset = resizedUrls
        .map(
            ({ resizedUrl, option: { width } = {} }) =>
                `${resizedUrl} ${width}w`
        )
        .join(', ');
    const fallback =
        resizedUrls.find(
            ({ option: { width } = {} }) => Number(width) === 1200
        ) ||
        resizedUrls[resizedUrls.length - 1] ||
        {};

    return {
        alt: getAlt(imageData),
        src: fallback.resizedUrl || imageData.url,
        srcset: srcset || undefined,
        sizes: getOpeningImageSizes(resizedUrls),
        width: fallback.option?.width,
        height: fallback.option?.height,
        pictureSources: []
    };
};
