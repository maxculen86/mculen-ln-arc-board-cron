/* eslint-disable camelcase */
/* eslint-disable no-undef */
import React from 'react';
import PageBuilderMessage from '../../home/common/components/pageBuilderMessage/pageBuilderMessage';
import {
    findSectionChildren,
    checkIfValid
} from '../../../common/utils/validateSectionHomeLN10';

const sectionHelper = (
    section,
    name,
    position,
    renderables,
    outputType,
    isAdmin
) => {
    const sectionChildren = findSectionChildren(renderables, position);
    const { isValid, message } = checkIfValid(name, sectionChildren);

    if (outputType === 'json') return 'TODO';
    const component = isValid ? (
        section
    ) : (
        <PageBuilderMessage
            id="LN-Home-error"
            type="warning"
            message={`La sección ${name} ${message}`}
        />
    );
    if (isAdmin) return component;
    return isValid ? component : null;
};

export default sectionHelper;
