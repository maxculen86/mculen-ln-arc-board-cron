export function replaceVideoId(url, newId) {
    const regex = /vid(\w{8})/;
    const newUrl = url.replace(regex, `jwid${newId}`);
    return newUrl;
}
