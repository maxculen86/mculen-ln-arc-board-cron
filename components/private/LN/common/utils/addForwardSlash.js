const addForwardSlash = str =>
    !str ? null : str.charCodeAt(str.length - 1) === 47 ? str : str.concat('/');

export default addForwardSlash;
