import getEmbedHref from '../../../../../../../common/utils/getEmbedHref';
import { boxInfoAnticipoComplete } from './boxInfoAnticipoComplete';

export const boxInfoAnticipo = (information, section, typeSection) => {
    const box = boxInfoAnticipoComplete(information, section, typeSection);
    if (box && box.parameters) {
        box.parameters.badge = information.textBadge
            ? information.textBadge.toUpperCase()
            : 'ANTICIPO';
        box.parameters.url = information.url;

        box.parameters.lead =
            information.lead && information.lead.trim().length !== 0
                ? information.lead
                : null;
        box.parameters.video = getEmbedHref('src', information.video);
    }
    return box;
};

export default boxInfoAnticipo;
