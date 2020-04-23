import React from 'react';
import PropTypes from 'fusion:prop-types';

const ComFigure = props => {
    const { classCondition, children } = props;
    if (!children) return null;
    return (
        <figure className={`mod-figure ${classCondition || ''}`}>
            {children}
        </figure>
    );
};

ComFigure.propTypes = {
    children: PropTypes.elementType.isRequired,
    classCondition: PropTypes.string
};

export default ComFigure;
