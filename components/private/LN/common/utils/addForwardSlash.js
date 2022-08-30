const addForwardSlash = str => {
    if (!str || typeof str !== 'string') return null;
    if (str.charCodeAt(str.length - 1) === 47) return str;
    return str.concat('/');
};

export default addForwardSlash;
