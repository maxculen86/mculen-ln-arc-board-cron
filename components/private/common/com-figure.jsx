/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/modules/mod-figure.css';

const ComFigure = ({ classCondition, children, handleClick }) => {
    return children ? (
        <figure
            role="button"
            onClick={handleClick}
            onKeyDown={handleClick}
            className={`mod-figure ${classCondition || ''}`}
        >
            {children}
        </figure>
    ) : (
        <></>
    );
};

ComFigure.propTypes = {
    children: PropTypes.node.isRequired,
    classCondition: PropTypes.string,
    handleClick: PropTypes.func
};

export default ComFigure;
