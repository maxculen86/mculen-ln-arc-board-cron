import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/modules/mod-picture.css';

const ComPicture = props => {
    const { href, classCondition, children } = props;
    if (!children)
        return (
            <a href={href}>
                <picture className="mod-picture --placeholder"></picture>
            </a>
        );
    return (
        // <picture className={`mod-picture ${classCondition || ''}`}>
        //     {href ? <a href={href}>{children}</a> : children}
        // </picture>
        <>
            {href ? (
                <a href={href}>
                    <picture className={`mod-picture ${classCondition || ''}`}>
                        {children}
                    </picture>
                </a>
            ) : (
                <picture className={`mod-picture ${classCondition || ''}`}>
                    {children}
                </picture>
            )}
        </>
    );
};

ComPicture.propTypes = {
    children: PropTypes.elementType.isRequired,
    href: PropTypes.string,
    classCondition: PropTypes.string
};

export default ComPicture;
