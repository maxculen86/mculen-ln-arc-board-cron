import sectionsValidation from '../../../layouts/config/LN10-Home.config.json';
import get from './get';

export const findSectionChildren = (renderables, position) => {
    const sectionFinded = renderables.find(
        ren => ren.collection === 'sections' && ren.props.id === position
    );
    return (sectionFinded && sectionFinded.children) || [];
};

export const checkIfValid = (name, children, paramSectionValidation = null) => {
    const sectionToValidate =
        paramSectionValidation == null
            ? sectionsValidation
            : paramSectionValidation;

    const childrenWithoutHide = children.filter(child =>
        get(child, 'props.customFields.hideCaja', false) !== true &&
        (get(child, 'props.customFields.hideByUrl', false) !== true ||
            get(child, 'props.customFields.hideByHtml', false) !== true) &&
        get(child, 'props.customFields.hideFeature', false) !== true
    );

    const sectionRule = sectionToValidate[name] || {};

    if (childrenWithoutHide.length > sectionRule.max) {
        return {
            isValid: false,
            message: `supera la cantidad de elementos permitidos (${sectionRule.max})`
        };
    }

    if (childrenWithoutHide.length < sectionRule.min) {
        return {
            isValid: false,
            message: `debe tener al menos ${sectionRule.min + 1} elementos`
        };
    }

    const response = {
        isValid: true,
        message: null
    };
    return response;
};

