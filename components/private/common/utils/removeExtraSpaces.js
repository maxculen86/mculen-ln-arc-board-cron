const removeExtraSpaces = str => str.trim().replace(/ {2,}/g, ' ');

export default removeExtraSpaces;
