import get from '../../../../../../../common/utils/get';

export const validateIdsPromoItems = promoItem => {
    const promoItemValidate = {};
    Object.keys(promoItem).forEach((key, i) => {
        promoItemValidate[key] = promoItem[key];
        // eslint-disable-next-line no-underscore-dangle
        if (promoItem && promoItem[key] && !promoItem[key]._id) {
            promoItemValidate[key] = {
                ...get(promoItem, key, null),
                _id: '0'.concat(i)
            };
        }
    });
    return promoItemValidate;
};

export default validateIdsPromoItems;
