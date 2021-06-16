import React from 'react';
import PropTypes from 'prop-types';

const LinkCssPreload = ({ href, type }) => (
    <link rel="preload" href={href} as="font" type={type} crossOrigin />
);

LinkCssPreload.propTypes = {
    href: PropTypes.string.isRequired,
    type: PropTypes.string
};

LinkCssPreload.defaultProps = { type: 'font/woff2' };

export default LinkCssPreload;
