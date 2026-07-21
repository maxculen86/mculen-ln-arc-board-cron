const stringFallback = string => {
    if (typeof string !== 'string') return '';
    return string;
};

export default stringFallback;
