import get from '../../../../../../../common/utils/get';
import Image from '../../../../elements/image';
import { boxInfoBasic } from '../../common/boxBasic';

export const boxInfoComplete = (information, section, typeSection) => {
    const box = boxInfoBasic(information, section, typeSection);

    if (box && information && !information.hideTitle) {
        const image = get(information.image, 'promo_items.basic', null);
        const imagenUrl = get(image, 'additional_properties.originalUrl', null);
        if (image && image.type === 'image') box.imagen = Image(image);
        if (imagenUrl) box.imagenUrl = imagenUrl;

        return {
            ...box,
            tituloCaja: information.title,
            url: information.url
        };
    }
    return box;
};

export default boxInfoComplete;
