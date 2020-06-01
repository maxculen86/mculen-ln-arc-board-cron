import React from 'react';
import PropTypes from 'fusion:prop-types';

import { getSectionLogo } from '../../../common/utils/sectionUtils';
import LogoComponent from './component';

const LogoBaseContainer = ({ sections, layout }) => {
    const sectionData = getSectionLogo(sections, layout);

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
    layout: PropTypes.string.isRequired
};

export default LogoBaseContainer;
