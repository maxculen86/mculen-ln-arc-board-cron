const removeAccents = str => {
    if (!str || typeof str !== 'string') return null;
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u0301]/g, '')
        .normalize();
};
export default removeAccents;
