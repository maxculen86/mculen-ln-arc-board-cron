import get from '../../../../../common/utils/get';
import getEmbedHref from '../../../../../common/utils/getEmbedHref';
import Image from '../../elements/image';

export const boxInfoBasic = (information, section, typeSection) => {
    if (!information) return null;
    const sectionAlias = section && section.toLowerCase();
    const type = typeSection[sectionAlias] || typeSection.default;

    const boxInfo = {
        ...type,
        diagramacion: information.layout || null
    };
    return boxInfo;
};
export const boxInfoComplete = (information, section, typeSection) => {
    const box = boxInfoBasic(information, section, typeSection);
    if (box && information && !information.hideTitle) {
        const image = get(information.image, 'promo_items.basic', null);
        const imagenUrl = get(image, 'additional_properties.originalUrl', null);
        if (image && image.type === 'image') box.imagen = Image(image);
        if (imagenUrl) box.imagenUrl = imagenUrl;
        if (information.buttonText && information.linkButton) {
            box.actionButton = {
                title: information.botomText,
                url: information.botomLink,
                style: information.botomStyle
            };
        }

        return {
            ...box,
            tituloCaja: information.title,
            url: information.url,
            chapita: information.chapita,
            chapitaStyle: information.chapitaStyle
        };
    }
    return box;
};

export const boxInfoApertura = (information, section, typeSection) => {
    const box = boxInfoBasic(information, section, typeSection);
    return box;
};

export const boxInfoAnticipo = (information, section, typeSection) => {
    const box = boxInfoComplete(information, section, typeSection);
    if (box && section === 'LN-common/cajaAnticipo') {
        box.texto = information.title;
    }
    return box;
};
export const boxInfoAnticipoLN10 = (information, section, typeSection) => {
    const box = boxInfoComplete(information, section, typeSection);
    if (box && section === 'LN-common/cajaAnticipo') {
        box.chapita = information.textBadge;
        box.volanta = information.lead;
        box.url = information.url;
        if (information.video === '') {
            box.texto = information.title;
        }
        box.video = getEmbedHref('src', information.video);
    }
    return box;
};

export const boxInfoBySectionAlias = {
    'LN-common/cajaAnticipo': boxInfoAnticipo,
    'LN-common/LN10_anticipo': boxInfoAnticipoLN10,
    apertura: boxInfoApertura,
    default: boxInfoComplete
};

export default boxInfoBySectionAlias;
