import React from 'react';
import sectionsValidation from '../../../layouts/config/LN-Home.config';
import PageBuilderMessage from '../../LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import get from './get';

const findSectionChildren = (renderables, position) => {
    const sectionFinded = renderables.find(
        ren => ren.collection === 'sections' && ren.props.id === position
    );
    return (sectionFinded && sectionFinded.children) || [];
};

const checkIfValid = (name, children) => {
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

const validateSectionHome = (
    section,
    name,
    position,
    renderables,
    outputType,
    isAdmin
) => {
    const sectionChildren = findSectionChildren(renderables, position);
    const message = checkIfValid(name, sectionChildren);

    if (outputType === 'json') return 'TODO';
    const component =
        message === true ? (
            section
        ) : (
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección ${name} ${message}`}
            />
        );
    if (isAdmin && message !== false) return component;
    return message === true ? component : null;
};

export default validateSectionHome;
