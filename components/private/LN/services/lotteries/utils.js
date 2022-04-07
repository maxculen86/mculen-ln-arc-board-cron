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

export const reorderSubLotteries = (results, order) =>
    results.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));

export const quini6Order = [
    'Segunda vuelta',
    'Revancha',
    'Pozo extra',
    'Siempre sale'
];

export const lotoPlusOrder = ['Desquite', 'Sale o sale'];
