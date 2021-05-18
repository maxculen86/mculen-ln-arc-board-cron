import sectionsValidation from '../../../layouts/config/LN-Home.config';
import get from './get';

export const findSectionChildren = (renderables, position) => {
    const sectionFinded = renderables.find(
        ren => ren.collection === 'sections' && ren.props.id === position
    );
    return sectionFinded.children || [];
};

export const checkIfValid = (name, children) => {
    const childrenWithoutHide = children.filter(
        child =>
            get(child, 'props.customFields.hideCaja', false) !== true &&
            get(child, 'props.customFields.hideFeature', false) !== true
    );
    const sectionRule = sectionsValidation[name] || {};
    if (sectionRule.quantity !== childrenWithoutHide.length) return false;

    if (
        !childrenWithoutHide.every(component =>
            sectionRule.types.includes(component.type)
        )
    )
        return `solo permite componentes del tipo ${sectionRule.types.join(
            ','
        )}`;

    return true;
};
