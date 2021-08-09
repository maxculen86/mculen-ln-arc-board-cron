import { getChildsFromSections } from '../../../private/LN/common/utils/homeHelper';
import sectionsValidation from '../../../layouts/config/LN-Home.config.json';
import get from '../../../private/common/utils/get';

export const isInSection = ({ sectionName, id, renderables = [] }) => {
    const sectionPosition =
        get(sectionsValidation, `${sectionName}.position`, 1) + 1;
    return getChildsFromSections(renderables, sectionPosition + 1).some(
        el => get(el, 'props.id', '') === id
    );
};

export const getErrorMessage = ({
    customFields: { url, hideByUrl, html, height, hideByHtml } = {}
}) =>
    (!url &&
        !hideByUrl &&
        !html &&
        !hideByHtml &&
        'Se requiere agregue la URL o HTML del anexo') ||
    (!html &&
        url &&
        !hideByUrl &&
        !height &&
        'El alto fijo del anexo es un campo requerido para los anexos con URL') ||
    '';

export const getComponentType = ({
    isAdmin,
    errorMessage,
    customFields: { url, hideByUrl, html, height, hideByHtml }
}) =>
    (isAdmin && errorMessage && 'Error') ||
    (!errorMessage && !hideByHtml && html && 'Html') ||
    (!errorMessage && !hideByUrl && url && height && 'Iframe');
