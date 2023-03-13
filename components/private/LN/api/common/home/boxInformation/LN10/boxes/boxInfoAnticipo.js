import getEmbedHref from '../../../../../../../common/utils/getEmbedHref';
import { boxInfoComplete } from './boxInfoComplete';

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

export default boxInfoAnticipo;
