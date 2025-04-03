const isExternalDistributor = (
    distributorName,
    distributorCategory,
    authorType
) =>
    distributorName !== 'lanacionar' &&
    distributorCategory === 'other' &&
    authorType !== 'Estándar';

export default isExternalDistributor;
