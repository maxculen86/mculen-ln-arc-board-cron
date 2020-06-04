import React from 'react';
import PropTypes from 'fusion:prop-types';

import { getSectionLogo } from '../../../common/utils/sectionUtils';
import LogoComponent from './component';
import ModSponsor from '../../../common/mod-sponsor';

const LogoBaseContainer = ({ sections, layout, sponsored, advertiser }) => {
    const sectionData = getSectionLogo(sections, layout);

    if (sections && sectionData) {
        const { path, logoName, color } = sectionData;

        if (sponsored) {
            return (
                <ModSponsor
                    type={`${advertiser ? '--contentlab' : ''}`}
                    sponsor={logoName}
                    textName={advertiser}
                    link={path}
                />
            );
        }

        return <LogoComponent path={path} logoName={logoName} color={color} />;
    }

    return <></>;
};

LogoBaseContainer.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired
        })
    ).isRequired,
    layout: PropTypes.string.isRequired,
    sponsored: PropTypes.bool,
    advertiser: PropTypes.string
};

export default LogoBaseContainer;
