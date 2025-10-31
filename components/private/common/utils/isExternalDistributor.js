const isExternalDistributor = (
    distributorName,
    distributorCategory,
    authorId
) =>
    distributorName !== 'lanacionar' &&
    distributorCategory === 'other' &&
    !authorId;

export default isExternalDistributor;
