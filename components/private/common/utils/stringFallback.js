const stringFallback = filterType => {
    if (typeof filterType !== 'string') return '';
    return filterType;
};

export default stringFallback;
