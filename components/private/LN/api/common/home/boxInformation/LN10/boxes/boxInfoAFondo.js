import { boxInfoComplete } from './boxInfoComplete';

export const boxInfoAFondo = (information, section, typeSection) => {
    const box = boxInfoComplete(information, section, typeSection);
    if (box && !box.parameters) {
        box.parameters = {};
    }
    if (box && box.parameters) {
        box.parameters.chainStyle = information.chainStyle || 'lightblue';
    }
    return box;
};

export default boxInfoAFondo;
