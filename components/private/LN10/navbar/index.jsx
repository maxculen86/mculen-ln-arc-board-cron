import React from 'react';
import PropTypes from 'prop-types';
import { Navbarmobile } from '@ln/contenidos-ui-navbarmobile';
import '../../../../resources/packages/css/@ln/contenidos-ui-navbarmobile/index.css';
import '../../../../resources/packages/css/@ln/common-ui-link/index.css';
import '../../../../resources/packages/css/@ln/common-ui-icon/index.css';
import { getNavbarItems } from './_helper';
import useTermica from '../../common/hooks/useTermica';
import { isSubscribed } from '../../LN/common/utils/contextHelper';

const Navbar = ({ isHome, toggleDesplegable }) => {
    const withBookmark = useTermica('bookmark_web');
    return (
        <Navbarmobile
            data={getNavbarItems(
                isHome,
                withBookmark,
                isSubscribed,
                toggleDesplegable
            )}
            className="--no-app"
        />
    );
};

Navbar.propTypes = {
    isHome: PropTypes.bool.isRequired,
    toggleDesplegable: PropTypes.func.isRequired
};

export default Navbar;
