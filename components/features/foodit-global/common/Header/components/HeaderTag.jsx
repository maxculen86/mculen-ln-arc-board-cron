import React from 'react';
import PropTypes from 'fusion:prop-types';

function HeaderTag({ isAcu, children, className }) {
    return isAcu ? (
        <h2 className={className}>{children}</h2>
    ) : (
        <h1 className={className}>{children}</h1>
    );
}
HeaderTag.propTypes = {
    children: PropTypes.node.isRequired,
    isAcu: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired
};

export default HeaderTag;
