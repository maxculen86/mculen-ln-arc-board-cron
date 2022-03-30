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

export const reorderQuini6 = results =>
    results.sort(
        (a, b) => quini6Order.indexOf(a.name) - quini6Order.indexOf(b.name)
    );

const quini6Order = [
    'Segunda vuelta',
    'Revancha',
    'Pozo extra',
    'Siempre sale'
];
