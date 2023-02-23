import { boxInfoBasic } from '../common/boxBasic';
import { boxInfoComplete } from '../common/boxComplete';

export const boxInfoApertura = (information, section, typeSection) => {
    const box = boxInfoBasic(information, section, typeSection);
    return box;
};

export const boxInfoAnticipo = (information, section, typeSection) => {
    const box = boxInfoComplete(information, section, typeSection);
    if (box) {
        box.texto = information.title;
    }
    return box;
};
