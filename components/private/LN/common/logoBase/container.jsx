import React from 'react';
import PropTypes from 'fusion:prop-types';

import {
    dictionaryAlt,
    getSectionLogo
} from '../../../common/utils/sectionUtils';
import ModSponsor from '../../../common/mod-sponsor';
import ComLogo from '../../../common/com-logo';

const LogoBaseContainer = ({
    sections,
    layout,
    distributor,
    sponsored,
    advertiser,
    tooltip
}) => {
    const { name: distributorName } = distributor || {};
    const sectionData = getSectionLogo(sections, layout, distributorName);

    const { path, logoName, color } = sectionData || {
        path: null,
        logoName: null,
        color: null
    };

    const altLogo = dictionaryAlt[logoName]
        ? dictionaryAlt[logoName]
        : logoName;

    const sponsor = !color && logoName ? `${logoName}${'-blanco'}` : logoName;

    if (sponsored) {
        return (
            <ModSponsor
                type={`${advertiser ? '--contentlab' : ''}`}
                logoName={logoName}
                sponsor={sponsor}
                textName={advertiser}
                link={`${path}/`} //agrego barra al final
                tooltip={tooltip}
            />
        );
    }

    return (
        <ComLogo
            href={`${path}/`} //agrego barra al final
            title={altLogo}
            logoName={sponsor}
            alt={altLogo}
            size="--sm"
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
