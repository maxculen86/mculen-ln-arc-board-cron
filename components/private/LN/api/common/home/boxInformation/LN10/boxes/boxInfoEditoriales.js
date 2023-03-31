import { boxInfoComplete } from './boxInfoComplete';

export const boxInfoEditorial = (information, section, typeSection) => {
    const box = boxInfoComplete(information, section, typeSection);
    if (box) {
        box.tituloCaja = 'Editoriales';
        box.diagramacion = 'editoriales2';
    }
    if (box && box.parameters) {
        box.parameters.title = 'Editoriales';
    }
    return box;
};

export default boxInfoEditorial;
