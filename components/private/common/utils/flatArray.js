function getArrayDepth(array) {
    return Array.isArray(array)
        ? 1 + Math.max(...array.map(child => getArrayDepth(child)))
        : 0;
}

const FlatArray = array => {
    const flatAarray = [];
    const arrayDepth = getArrayDepth(array);

    if (array && typeof array !== 'undefined' && arrayDepth === 1) {
        flatAarray.push(...array);
    } else if (
        array &&
        typeof array !== 'undefined' &&
        array.length > 0 &&
        arrayDepth === 2
    ) {
        flatAarray.push(...array);
    } else if (array) {
        array.forEach(set => {
            flatAarray.push(...set);
        });
    }

    return flatAarray || [];
};

export default FlatArray;
