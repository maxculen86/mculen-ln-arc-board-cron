import getEmbedHref from '../../../../../../common/utils/getEmbedHref';
import { boxInfoBasic } from '../common/boxBasic';
import { boxInfoComplete } from '../common/boxComplete';

export const boxInfoApertura = (information, section, typeSection) => {
    const box = boxInfoBasic(information, section, typeSection);
    return box;
};

export const boxInfoAnticipo = (information, section, typeSection) => {
    const box = boxInfoComplete(information, section, typeSection);
    if (box) {
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

export const boxInfoExclusiveSuscriptor = (
    information,
    section,
    typeSection
) => {
    const informationWithExclude = information;
    informationWithExclude.buttonText = null;
    informationWithExclude.linkButton = null;
    const box = boxInfoComplete(informationWithExclude, section, typeSection);

    return box;
};
