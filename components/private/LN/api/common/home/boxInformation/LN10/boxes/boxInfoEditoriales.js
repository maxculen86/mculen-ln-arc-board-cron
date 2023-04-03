import { boxInfoComplete } from './boxInfoComplete';

export const boxInfoEditorial = (information, section, typeSection) => {
    const box = boxInfoComplete(information, section, typeSection);
    if (box) {
        box.tituloCaja = 'Editoriales';
        box.diagramacion = 'editoriales2';
        if (!box.parameters) {
            box.parameters = {};
        }
        if (box.parameters) {
            box.parameters.title = 'Editoriales';
        }
        if (box.parameters && box.parameters.url) {
            box.url = 'https://www.lanacion.com.ar/editoriales/';
            box.parameters.url = 'https://www.lanacion.com.ar/editoriales/';
        }
    }

    return box;
};

export default boxInfoEditorial;
