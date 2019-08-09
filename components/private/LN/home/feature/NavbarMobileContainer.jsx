import React from 'react';
import PropTypes from 'fusion:prop-types';

const NavbarMobileContainer = ({ data }) => {
    return <div>{data}</div>;
};

NavbarMobileContainer.propTypes = {
    data: PropTypes.string.isRequired
};

export default NavbarMobileContainer;
