import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/modules/mod-picture.css';

const ComPicture = props => {
    const { href, classCondition, children } = props;
    if (!children)
        return (
            <picture className="mod-picture --placeholder">
                <a href={href}></a>
            </picture>
        );
    return (
        <picture className={`mod-picture ${classCondition || ''}`}>
            {href ? <a href={href}>{children}</a> : children}
        </picture>
    );
};

ComPicture.propTypes = {
    children: PropTypes.elementType.isRequired,
    href: PropTypes.string,
    classCondition: PropTypes.string
};

export default ComPicture;
