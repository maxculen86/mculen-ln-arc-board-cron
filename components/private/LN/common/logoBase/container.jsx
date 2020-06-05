import React from 'react';
import PropTypes from 'fusion:prop-types';

import { getSectionLogo } from '../../../common/utils/sectionUtils';
import LogoComponent from './component';

const LogoBaseContainer = ({ sections, layout, distributor }) => {
    const { name: distributorName } = distributor || {};
    const sectionData = getSectionLogo(sections, layout, distributorName);
    // console.log("LogoBaseContainer -> sectionData", sectionData)

    if (sections && sectionData) {
        const { path, logoName, color } = sectionData;
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
    distributor: PropTypes.shape({
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired
    }).isRequired,
    layout: PropTypes.string.isRequired
};

export default LogoBaseContainer;
