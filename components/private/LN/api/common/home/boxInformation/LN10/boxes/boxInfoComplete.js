import get from '../../../../../../../common/utils/get';
import Image from '../../../../elements/image';
import { boxInfoBasic } from '../../common/boxBasic';

export const boxInfoComplete = (information, section, typeSection) => {
    const box = boxInfoBasic(information, section, typeSection);

    if (box && information && !information.hideTitle) {
        const image = get(information.image, 'promo_items.basic', null);
        const imagenUrl = get(image, 'additional_properties.originalUrl', null);
        if (image && image.type === 'image') box.imagen = Image(image);
        if (imagenUrl) box.imageUrl = imagenUrl;
        return {
            ...box,
            tituloCaja: information.title,
            url: information.link,
            parameters: {
                title: information.title,
                url: information.link,
                badge: information.chapita,
                badgeStyle: information.chapitaStyle,
                actionButton:
                    information.buttonText && information.linkButton
                        ? {
                              title: information.buttonText,
                              url: information.linkButton,
                              style: information.buttonStyle
                          }
                        : null
            }
        };
    }
    return box;
};

export default boxInfoComplete;
