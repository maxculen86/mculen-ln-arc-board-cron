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
        box.tituloCaja = (
            box.tituloCaja || 'Exclusivo suscriptores'
        ).toUpperCase();
    }
    if (box && box.parameters) {
        box.parameters.title = (
            box.parameters.title || 'Exclusivo suscriptores'
        ).toUpperCase();
    }
    return box;
};

export default boxInfoExclusiveSuscriptor;
