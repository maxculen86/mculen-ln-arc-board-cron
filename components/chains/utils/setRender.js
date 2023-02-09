/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import WarningMessage from '../../private/common/warningMessage/warningMessage';

const setRender = ({
    chainId,
    viewabilityData = {},
    isAdmin,
    error = {},
    hideBox = false,
    extraOptions = {},
    withSection = true
}) => {
    const { default: defaultOpt, ...restOptions } = extraOptions;

    const options = {
        isWarning: isAdmin && error && error.message && (
            <WarningMessage type={error.type} message={error.message} />
        ),
        isEmpty: (hideBox || (error && error.message)) && <></>,
        ...restOptions,
        ...(defaultOpt && { default: defaultOpt })
    };

    const Component = Object.values(options).find(Boolean);

    return withSection ? (
        <section {...viewabilityData} data-chain-id={chainId}>
            {Component}
        </section>
    ) : (
        Component
    );
};

export default setRender;
