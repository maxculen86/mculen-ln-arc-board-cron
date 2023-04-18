import { boxInfoComplete } from './boxInfoComplete';

export const boxInfoOpinion = (information, section, typeSection) => {
    const box = boxInfoComplete(information, section, typeSection);
    if (box) {
        box.tituloCaja = box.tituloCaja || 'Opinión';
        if (!box.parameters) {
            box.parameters = {};
        }
        if (box.parameters) {
            box.parameters.title = box.parameters.title || 'Opinión';
        }
        if (box.parameters && information && information.url) {
            box.url = 'https://www.lanacion.com.ar/opinion/';
            box.parameters.url = 'https://www.lanacion.com.ar/opinion/';
        }
    }

    return box;
};

export default boxInfoOpinion;
