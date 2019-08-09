import React from 'react';
import PropTypes from 'fusion:prop-types';
import ListMenu from './listMenu';

const NavbarMobileContainer = ({ data }) => {
    return (
        <>
            <ListMenu data={data} />
        </>
    );
};

NavbarMobileContainer.propTypes = {
    data: PropTypes.string.isRequired
};

export default NavbarMobileContainer;
