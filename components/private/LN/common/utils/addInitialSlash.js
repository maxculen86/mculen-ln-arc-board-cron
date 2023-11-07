export const addInitialSlash = str => {
    if (!str || typeof str !== 'string') return null;
    if (str.charCodeAt(0) === 47) return str;
    return `/${str}`;
};
