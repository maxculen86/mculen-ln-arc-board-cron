/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import StaticContent from '../../private/common/staticContent';
import WarningMessage from '../../private/common/warningMessage/warningMessage';

const setRender = ({
    isAdmin,
    error = {},
    hideBox,
    Component,
    extraOptsDiv
}) => {
    const options = {
        isWarning: isAdmin && error && (
            <WarningMessage type={error.type} message={error.message} />
        ),
        isEmpty: (hideBox || error) && <></>,
        default: <StaticContent {...extraOptsDiv}>{Component}</StaticContent>
    };
    return Object.values(options).find(Boolean);
};

export default setRender;
