import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/modules/mod-figure.css';

const ComFigure = props => {
    const { classCondition, children } = props;
    if (!children) return null;
    return (
        <figure
            onClick={this.toggleClass}
            className={this.state.active ? '--active' : ''}
            className={`mod-figure ${classCondition || ''}`}
        >
            {children}
        </figure>
    );
};

ComFigure.propTypes = {
    children: PropTypes.elementType.isRequired,
    classCondition: PropTypes.string
};

export default ComFigure;
