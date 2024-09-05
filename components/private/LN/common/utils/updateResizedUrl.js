export const updateResizedUrl = (url, newWidth, newHeight) => {
    try {
        const urlObj = new URL(url);

        if (urlObj.searchParams.has('width')) {
            urlObj.searchParams.set('width', newWidth);
        }

        if (urlObj.searchParams.has('height')) {
            urlObj.searchParams.set('height', newHeight);
        }

        return urlObj.toString();
    } catch (e) {
        return url;
    }
};
