import React from 'react';
import Context from 'fusion:context';
import Static from 'fusion:static';
import PropTypes from 'fusion:prop-types';
import getProperties from 'fusion:properties';
import HeaderContainer from '../../private/OTT/common/header';
import checkHydrateOnly from '../../private/LN/common/utils/checkHydrateOnly';
import StaticContent from '../../private/common/staticContent';

const Header = props => {
    const { arcSite = 'ott', id: featureId, globalContent = {} } = props;
    const { node_type: nodeType = '' } = globalContent;
    const siteVars = getProperties(arcSite);
    const headerHierarchy = siteVars.header.hierarchy;
    const hasHydrateOnly = checkHydrateOnly({ nodeType });

    return hasHydrateOnly ? (
        <StaticContent>
            <HeaderContainer hierarchy={headerHierarchy} />
        </StaticContent>
    ) : (
        <Static id={featureId}>
            <HeaderContainer hierarchy={headerHierarchy} />
        </Static>
    );
};

Header.propTypes = {
    globalContent: PropTypes.shape({
        node_type: PropTypes.string.isRequired
    }).isRequired,
    arcSite: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default Context(Header);
