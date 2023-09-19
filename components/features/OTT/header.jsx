import React from 'react';
import Context from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import getProperties from 'fusion:properties';
import HeaderContainer from '../../private/OTT/common/header';
import StaticContent from '../../private/common/staticContent';

const Header = props => {
    const { arcSite = 'ott' } = props;
    const siteVars = getProperties(arcSite);
    const headerHierarchy = siteVars.header.hierarchy;

    return (
        <StaticContent>
            <HeaderContainer hierarchy={headerHierarchy} />
        </StaticContent>
    );
};

Header.propTypes = {
    globalContent: PropTypes.shape({
        node_type: PropTypes.string.isRequired
    }).isRequired,
    arcSite: PropTypes.string.isRequired
};

export default Context(Header);
