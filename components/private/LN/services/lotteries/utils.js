export const setTraditionFirst = input => {
    const traditional = input.find(item => item.name === 'Tradicional');
    return [traditional, ...input.filter(item => item.name !== 'Tradicional')];
};
