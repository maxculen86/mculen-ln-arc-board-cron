/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';

import {
    dictionaryAlt,
    getSectionLogo
} from '../../private/common/utils/sectionUtils';

import ComLogo from '../../private/common/com-logo';
import getTargetAndRelIfExternal from '../../private/common/utils/getTargetAndRelIfExternal';

// TODO
// Revisar, hay 2 componentes 'logo'
function Logo(props) {
    const {
        globalContent: {
            taxonomy: { sections },
            distributor
        },
        layout
    } = props;

    const { name } = distributor || {};
    const logo = getSectionLogo(sections, layout, name);

    const { path, logoName, isExternal } = logo || {
        path: null,
        logoName: null,
        isExternal: null
    };

    const altLogo = dictionaryAlt[logoName]
        ? dictionaryAlt[logoName]
        : logoName;

    const { target, rel } = getTargetAndRelIfExternal(isExternal);

    return logoName !== 'canchallena' ? (
        <ComLogo
            size="--xs"
            logoName={logoName}
            href={path}
            target={target}
            rel={rel}
            alt={altLogo}
            title={altLogo}
            classCondition="ln-nota-logo"
        />
    ) : null;
}

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
