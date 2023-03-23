import { boxInfoComplete } from './boxInfoComplete';

export const boxInfoAFondo = (information, section, typeSection) => {
    const box = boxInfoComplete(information, section, typeSection);
    if (box && box.parameters) {
        if (information.chainStyle) {
            box.parameters.chainStyle = information.chainStyle;
        }
    }
    return box;
};

export default boxInfoAFondo;
