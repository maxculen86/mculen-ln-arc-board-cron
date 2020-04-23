import React from 'react';
import PropTypes from 'fusion:prop-types';

const ComPicture = props => {
    const { classCondition, children } = props;
    if (!children) return null;
    return (
        <picture className={`mod-image ${classCondition || ''}`}>
            {children}
        </picture>
    );
};

ComPicture.propTypes = {
    children: PropTypes.elementType.isRequired,
    classCondition: PropTypes.string
};

export default ComPicture;
