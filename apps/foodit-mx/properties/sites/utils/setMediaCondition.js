const setMediaCondition = measures => {
    const { minWidth, maxWidth } = measures || {};

    if (minWidth && maxWidth) {
        return `(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`;
    }

    if (minWidth) {
        return `(min-width: ${minWidth}px)`;
    }

    if (maxWidth) {
        return `(max-width: ${maxWidth}px)`;
    }

    return '';
};

export default setMediaCondition;
