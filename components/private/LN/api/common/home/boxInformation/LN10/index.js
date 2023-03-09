import getEmbedHref from '../../../../../../common/utils/getEmbedHref';
import { boxInfoBasic } from '../common/boxBasic';
import { boxInfoComplete } from '../common/boxComplete';

export const boxInfoApertura = (information, section, typeSection) => {
    const box = boxInfoBasic(information, section, typeSection);
    return box;
};

export const boxInfoAnticipo = (information, section, typeSection) => {
    const box = boxInfoComplete(information, section, typeSection);
    if (box && box.parameters) {
        box.parameters.badge = information.textBadge;
        box.parameters.lead = information.lead;
        box.parameters.url = information.url;
        if (information.video === '') {
            box.parameters.text = information.title;
        }
        box.parameters.video = getEmbedHref('src', information.video);
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
