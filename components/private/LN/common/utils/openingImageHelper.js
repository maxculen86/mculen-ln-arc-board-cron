import { updateResizedUrl } from './updateResizedUrl';

export const OPENING_IMAGE_FALLBACK = {
    width: 1200,
    height: 675
};

const getAlt = imageData => {
    const { alt_text: altText, caption, titleText } = imageData || {};
    return altText || caption || titleText || '';
};

const hasResizeParams = (url = '') =>
    typeof url === 'string' &&
    url.includes('width=') &&
    url.includes('height=');

const updateOpeningResizedUrl = (url, newWidth, newHeight) => {
    const updatedUrl = updateResizedUrl(url, newWidth, newHeight);

    if (updatedUrl !== url) return updatedUrl;

    try {
        const urlObj = new URL(url);
        const updatedPathname = urlObj.pathname.replace(
            /=\/(\d+)x(\d+)\//,
            `=/${newWidth}x${newHeight}/`
        );

        if (updatedPathname === urlObj.pathname) {
            return url;
        }

        urlObj.pathname = updatedPathname;

        return urlObj.toString();
    } catch (e) {
        return url;
    }
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

const getBaseResizedUrl = imageData => {
    const { url = '', resized_urls: resizedUrls = [] } = imageData || {};

    if (hasResizeParams(url)) return url;

    const resizedWithParams = resizedUrls.find(({ resizedUrl = '' }) =>
        hasResizeParams(resizedUrl)
    );

    return resizedWithParams?.resizedUrl || url;
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

const getOpeningFallbackEntry = imageData => {
    const { resized_urls: resizedUrls = [] } = imageData || {};
    const existing = getResponsiveEntries(resizedUrls).find(
        ({ option: { width } = {} }) =>
            Number(width) === OPENING_IMAGE_FALLBACK.width
    );

    if (existing?.resizedUrl) {
        return {
            option: {
                ...existing.option,
                width: OPENING_IMAGE_FALLBACK.width,
                height: OPENING_IMAGE_FALLBACK.height
            },
            resizedUrl: updateOpeningResizedUrl(
                existing.resizedUrl,
                OPENING_IMAGE_FALLBACK.width,
                OPENING_IMAGE_FALLBACK.height
            )
        };
    }

    const baseResizedUrl = getBaseResizedUrl(imageData);

    if (!baseResizedUrl) return null;

    return {
        option: {
            width: OPENING_IMAGE_FALLBACK.width,
            height: OPENING_IMAGE_FALLBACK.height
        },
        resizedUrl: updateOpeningResizedUrl(
            baseResizedUrl,
            OPENING_IMAGE_FALLBACK.width,
            OPENING_IMAGE_FALLBACK.height
        )
    };
};

const getOpeningImageResizedUrls = imageData => {
    if (!imageData?.url) return [];

    const responsiveEntries = getResponsiveEntries(
        imageData.resized_urls || []
    );
    const fallbackEntry = getOpeningFallbackEntry(imageData);
    const entriesWithoutFallback = responsiveEntries.filter(
        ({ option: { width } = {} }) =>
            Number(width) !== OPENING_IMAGE_FALLBACK.width
    );

    if (!fallbackEntry?.resizedUrl) {
        return responsiveEntries;
    }

    return [...entriesWithoutFallback, fallbackEntry].sort(
        (a, b) => Number(a.option?.width || 0) - Number(b.option?.width || 0)
    );
};

export const buildOpeningImage = imageData => {
    if (!imageData?.url) return null;

    const resizedUrls = getOpeningImageResizedUrls(imageData);
    const srcset = resizedUrls
        .map(
            ({ resizedUrl, option: { width } = {} }) =>
                `${resizedUrl} ${width}w`
        )
        .join(', ');
    const fallback =
        resizedUrls.find(
            ({ option: { width } = {} }) =>
                width === OPENING_IMAGE_FALLBACK.width
        ) || {};

    return {
        alt: getAlt(imageData),
        src: fallback.resizedUrl || imageData.url,
        srcset: srcset || undefined,
        sizes: getOpeningImageSizes(resizedUrls),
        width: OPENING_IMAGE_FALLBACK.width,
        height: OPENING_IMAGE_FALLBACK.height,
        pictureSources: []
    };
};
