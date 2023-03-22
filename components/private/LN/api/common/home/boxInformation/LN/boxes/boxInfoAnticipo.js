import { boxInfoComplete } from './boxInfoComplete';

export const boxInfoAnticipo = (information, section, typeSection) => {
    const box = boxInfoComplete(information, section, typeSection);
    if (box) {
        box.text = information.title;
    }
    return box;
};

export default boxInfoAnticipo;
