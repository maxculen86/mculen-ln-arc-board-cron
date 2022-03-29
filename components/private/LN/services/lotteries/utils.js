export const setTraditionFirst = input => {
    const traditional = input.find(item => item.name === 'Tradicional');
    return [traditional, ...input.filter(item => item.name !== 'Tradicional')];
};

export const hasTraditionalResult = (isDetail, results) => {
    if (isDetail) {
        return false;
    }
    return !results[0];
};
