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

    return box;
};

export default boxInfoExclusiveSuscriptor;
