import { boxInfoComplete } from './boxInfoComplete';

export const boxInfoExclusiveSuscriptor = (
    information,
    section,
    typeSection
) => {
    const informationWithExclude = information;
    informationWithExclude.buttonText = null;
    informationWithExclude.linkButton = null;
    const box = boxInfoComplete(informationWithExclude, section, typeSection);
    if (box) {
        box.tituloCaja = box.tituloCaja || 'Exclusivo suscriptores';
    }
    if (box && box.parameters) {
        box.parameters.title = box.parameters.title || 'Exclusivo suscriptores';
    }
    return box;
};

export default boxInfoExclusiveSuscriptor;
