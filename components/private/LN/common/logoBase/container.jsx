import React from 'react';
import PropTypes from 'prop-types';

import {
    dictionaryAlt,
    getSectionLogo
} from '../../../common/utils/sectionUtils';
import ModSponsor from '../../../common/mod-sponsor';
import ComLogo from '../../../common/com-logo';

function LogoBaseContainer({
    sections,
    layout,
    distributor,
    sponsored,
    advertiser,
    tooltip
}) {
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
                link={`${path}/`} // agrego barra al final
                tooltip={tooltip}
            />
        );
    }

    return (
        <ComLogo
            href={`${path}/`} // agrego barra al final
            title={altLogo}
            logoName={sponsor}
            alt={altLogo}
            size="--sm"
        />
    );
}

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
    tooltip: PropTypes.string
};

LogoBaseContainer.defaultProps = {
    sponsored: false,
    advertiser: '',
    tooltip: ''
};

export default LogoBaseContainer;
