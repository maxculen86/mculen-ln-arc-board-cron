import React from 'react';
import PropTypes from 'fusion:prop-types';

const Text = ({ children, bold, tag, mod, size }) => {
    const CustomTag = tag || 'span';

    const className = `text${bold ? ` --font-bold` : ''}${
        mod ? ` ${mod}` : ''
    }${size ? ` ${size}` : ''}`;

    return <CustomTag className={className}>{children}</CustomTag>;
};

Text.propTypes = {
    children: PropTypes.element,
    tag: PropTypes.string,
    mod: PropTypes.string,
    size: PropTypes.string
};

export default Text;
