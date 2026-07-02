const safeJSONParse = (str, fallback = []) => {
    if (typeof str !== 'string' || str === null) {
        return fallback;
    }

    try {
        return JSON.parse(str);
    } catch (error) {
        return fallback;
    }
};

export default safeJSONParse;
