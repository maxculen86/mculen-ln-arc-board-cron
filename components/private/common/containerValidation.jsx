import React from 'react';
import PropTypes from 'prop-types';

const ContainerValidation = ({ children, layout }) => {
    const isPhoto100 = layout === 'LN-nota-foto-al-100';
    const classCondition = isPhoto100 ? 'container-center-100' : '';
    if (!isPhoto100) return <>{children}</>;

    return <div className={classCondition}>{children}</div>;
};

ContainerValidation.propTypes = {
    children: PropTypes.node.isRequired,
    layout: PropTypes.string
};
ContainerValidation.defaultProps = {
    layout: ''
};

export default ContainerValidation;
