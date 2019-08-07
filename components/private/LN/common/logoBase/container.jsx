import React from 'react';
import PropTypes from 'fusion:prop-types';

import { getSectionStyle } from '../../../common/utils/sectionUtils';
import LogoComponent from './component';

const logoBaseContainer = ({ sections }) => {
    const sectionStyle = getSectionStyle(sections);
    if (sectionStyle) {
        return <LogoComponent styledNamed={sectionStyle} />;
    }
    return null;
};

logoBaseContainer.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            additional_properties: PropTypes.shape({
                original: PropTypes.shape({
                    style: PropTypes.shape({
                        section_style_name: PropTypes.string
                    })
                })
            })
        })
    ).isRequired
};

export default logoBaseContainer;
