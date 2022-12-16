/* eslint-disable camelcase */
/* eslint-disable no-undef */
import React from 'react';
import PageBuilderMessage from '../../home/common/components/pageBuilderMessage/pageBuilderMessage';
import {
    findSectionChildren,
    checkIfValid
} from '../../../common/utils/validateSectionHome';

const sectionHelper = (
    section,
    name,
    position,
    renderables,
    outputType,
    isAdmin
) => {
    const sectionChildren = findSectionChildren(renderables, position);
    const { msg: message, isValid } = checkIfValid(name, sectionChildren);

    if (outputType === 'json') return 'TODO';
    if (isAdmin && message !== '')
        return (
            <PageBuilderMessage
                id="LN-Home-error"
                type="warning"
                message={`La sección ${name} ${message}`}
            />
        );
    return isValid === true ? section : null;
};

export default sectionHelper;
