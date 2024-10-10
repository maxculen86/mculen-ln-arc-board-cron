import React, { Fragment } from 'react';
import PropTypes from 'fusion:prop-types';

function ConditionalWrapper({ condition, wrapperProps, children }) {
    const Wrapper = condition ? 'div' : Fragment;
    return <Wrapper {...(condition ? wrapperProps : {})}>{children}</Wrapper>;
}

ConditionalWrapper.propTypes = {
    condition: PropTypes.bool.isRequired,
    wrapperProps: PropTypes.object,
    children: PropTypes.node.isRequired
};

ConditionalWrapper.defaultProps = {
    wrapperProps: {}
};

export default ConditionalWrapper;
