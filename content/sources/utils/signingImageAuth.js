import get from '../../../components/private/common/utils/get';

export const hasPromoItemImgAuth = ({ dataPromoItem }) =>
    get(dataPromoItem, 'promo_items.basic.type', '') === 'image' &&
    !get(dataPromoItem, `promo_items.basic.auth.1`);

export default hasPromoItemImgAuth;
