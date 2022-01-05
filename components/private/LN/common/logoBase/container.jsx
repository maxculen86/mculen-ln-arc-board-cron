import React from 'react';
import PropTypes from 'fusion:prop-types';

import { getSectionLogo } from '../../../common/utils/sectionUtils';
import LogoComponent from './component';
import ModSponsor from '../../../common/mod-sponsor';

const LogoBaseContainer = ({
    sections,
    layout,
    distributor,
    sponsored,
    advertiser,
    subtype,
    tooltip
}) => {
    const { name: distributorName } = distributor || {};
    const sectionData = getSectionLogo(sections, layout, distributorName);

    const { path, logoName, color } = sectionData || {
        path: null,
        logoName: null,
        color: null
    };

    if (sponsored) {
        return (
            <ModSponsor
                type={`${advertiser ? '--contentlab' : ''}`}
                sponsor={`${logoName}${color ? `-blanco` : ''}`}
                textName={advertiser}
                link={`${path}/`} //agrego barra al final
                tooltip={tooltip}
            />
        );
    }

    return (
        <LogoComponent
            path={`${path}/`} //agrego barra al final
            logoName={logoName}
            color={color}
            subtype={subtype}
        />
    );
};

LogoBaseContainer.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired
        })
    ).isRequired,
    distributor: PropTypes.shape({
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired
    }).isRequired,
    layout: PropTypes.string.isRequired,
    sponsored: PropTypes.bool,
    advertiser: PropTypes.string,
    subtype: PropTypes.string
};

export default LogoBaseContainer;
