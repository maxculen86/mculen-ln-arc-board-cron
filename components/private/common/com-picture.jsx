import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/modules/mod-picture.css';

const ComPicture = props => {
    const { classCondition, children } = props;
    if (!children) return null;
    return (
        <picture className={`mod-picture ${classCondition || ''}`}>
            {children}
        </picture>
    );
};

ComPicture.propTypes = {
    children: PropTypes.elementType.isRequired,
    classCondition: PropTypes.string
};

export default ComPicture;
