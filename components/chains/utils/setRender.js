import React from 'react';
import WarningMessage from '../../private/common/warningMessage/warningMessage';

const setRender = ({ isAdmin, error = {}, hideBox, extraOptions = {} }) => {
    const { default: defaultOpt, ...restOptions } = extraOptions;

    const options = {
        isWarning: isAdmin && error && (
            <WarningMessage type={error.type} message={error.message} />
        ),
        isEmpty: (hideBox || error) && <></>,
        ...restOptions,
        ...(defaultOpt && { default: defaultOpt })
    };
    return Object.values(options).find(Boolean);
};

export default setRender;
