/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';

import {
    dictionaryAlt,
    getSectionLogo
} from '../../private/common/utils/sectionUtils';

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

    const link = path ? `${path}/` : null;

    const altLogo = dictionaryAlt[logoName]
        ? dictionaryAlt[logoName]
        : logoName;

    return (
        <ComLogo
            size="--xs"
            logoName={logoName}
            href={link}
            alt={altLogo}
            title={altLogo}
            classCondition="ln-nota-logo"
        />
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
    }),
    layout: PropTypes.string
};

export default Consumer(Logo);
