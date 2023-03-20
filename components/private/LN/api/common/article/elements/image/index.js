import get from '../../../../../../common/utils/get';
import Image from '../../../elements/image';

export const getArticleImage = article => {
    const imagedefault =
        get(article, 'additionalProperties.image.promo_items.basic', null) ||
        get(article, 'promo_items.basic', null);

    if (imagedefault && imagedefault.type === 'image')
        return Image(imagedefault);

    return null;
};
export default getArticleImage;
