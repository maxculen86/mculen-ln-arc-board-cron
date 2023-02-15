import get from '../../../../private/common/utils/get';
import sectionsValidation from '../../../../layouts/config/LN-Home.config.json';
import { getChildsFromSections } from '../../../../private/LN/common/utils/homeHelper-WebApi';

export const isInSection = ({ sectionName, id, renderables = [] }) => {
    const sectionPosition =
        get(sectionsValidation, `${sectionName}.position`, 1) + 1;

    return getChildsFromSections(sectionPosition, renderables).some(
        el => get(el, 'props.id', '') === id
    );
};

export const getErrorMessage = ({
    isApertura,
    customFields: {
        url = '',
        hideByUrl = false,
        html = '',
        heightDesktop,
        heightTablet,
        heightMobile,
        hideByHtml = false
    } = {}
}) =>
    (!url &&
        !hideByUrl &&
        !html &&
        !hideByHtml &&
        'Se requiere agregue la URL o HTML del anexo') ||
    ((hideByHtml || (!html && !hideByHtml)) &&
        url &&
        !hideByUrl &&
        (!heightDesktop || !heightTablet || !heightMobile) &&
        'Los tres altos fijos del anexo (Desktop, Tablet y Mobile) son campos requeridos para los anexos con URL') ||
    ((hideByHtml || (!html && !hideByHtml)) &&
        url &&
        !hideByUrl &&
        isApertura &&
        (heightDesktop > 250 || heightTablet > 250 || heightMobile > 250) &&
        'Los altos fijos máximos de anexos con URL en apertura son de 250px para Desktop, Tablet y Mobile. Corrijalos, caso contrario no se verá el anexo') ||
    '';
