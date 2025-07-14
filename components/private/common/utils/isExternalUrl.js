export function isExternalUrl(url, siteHost) {
    try {
        const parsedUrl = new URL(url, siteHost);
        const currentHostname = new URL(siteHost).hostname;
        return parsedUrl.hostname !== currentHostname;
    } catch (e) {
        console.error('Invalid URL:', url, e);
        return false;
    }
}
