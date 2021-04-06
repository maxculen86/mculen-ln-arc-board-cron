const addForwardSlash = str =>
    str.charCodeAt(str.length - 1) === 47 ? str : str.concat('/');

export default addForwardSlash;
