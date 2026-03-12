import React from 'react';

function ContainerValidation({ children, layout = '' }) {
    const isPhoto100 = layout === 'LN-nota-foto-al-100';
    const classCondition = isPhoto100 ? 'container-center-100' : '';
    if (!isPhoto100) return children;

    return <div className={classCondition}>{children}</div>;
}

export default ContainerValidation;
