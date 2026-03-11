import React, { Fragment } from 'react';

function ConditionalWrapper({ condition, wrapperProps, children }) {
    const Wrapper = condition ? 'div' : Fragment;
    return <Wrapper {...(condition ? wrapperProps : {})}>{children}</Wrapper>;
}

export default ConditionalWrapper;
