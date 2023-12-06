export function replaceVideoId(url = '', newId = '') {
    if (url === null || url === undefined) {
        return url;
    }
    const regex = /vid(\w{8})/;
    const newUrl = url.replace(regex, `jwid${newId}`);
    return newUrl;
}
