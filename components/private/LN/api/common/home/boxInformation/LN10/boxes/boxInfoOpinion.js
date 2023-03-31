import { boxInfoComplete } from './boxInfoComplete';

export const boxInfoOpinion = (information, section, typeSection) => {
    const box = boxInfoComplete(information, section, typeSection);
    if (box) {
        box.tituloCaja = box.tituloCaja || 'Opinión';
    }
    if (box && box.parameters) {
        box.parameters.title = box.parameters.title || 'Opinión';
    }
    return box;
};

export default boxInfoOpinion;
