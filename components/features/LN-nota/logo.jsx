import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';

import { getSectionLogo } from '../../private/common/utils/sectionUtils';

import ComLink from '../../private/common/com-link';
import ComLogo from '../../private/common/com-logo';

const Logo = props => {
    const {
        globalContent: {
            taxonomy: { sections },
            distributor
        },
        layout
    } = props;

    const { name } = distributor || {};
    const logo = getSectionLogo(sections, layout, name);

    const { path, logoName } = logo || {
        path: null,
        logoName: null
    };

    return (
        <ComLink link={path}>
            <ComLogo color="true" logoName={logoName} size="--medium" />
        </ComLink>
    );
};

Logo.label = 'LN-Nota-Logo';

Logo.propTypes = {
    globalContent: PropTypes.shape({
        distributor: PropTypes.shape({
            name: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired
        }).isRequired,
        taxonomy: PropTypes.shape({
            sections: PropTypes.arrayOf(PropTypes.object)
        }).isRequired
    }).isRequired,
    layout: PropTypes.string.isRequired
};

export default Consumer(Logo);
