export const replaceVideoId = (url = '', newId = '') =>
    url ? url.replace(/vid(\w{8})/, `jwid${newId}`) : url;
