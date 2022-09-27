import React from 'react';
import PropTypes from 'fusion:prop-types';
import { subtypesWithAmp } from './utils/subtypes/subtypeHelper';
import get from './utils/get';

const Robot = props => {
    const { canonicalUrl, subtype } = props;
    const hasAmpLink = get(subtypesWithAmp, subtype, false);

    return hasAmpLink && canonicalUrl ? (
        <link
            rel="canonical"
            href={`https://www.lanacion.com.ar${canonicalUrl}`}
        />
    ) : (
        <></>
    );
};

Robot.propTypes = {
    canonicalUrl: PropTypes.string.isRequired,
    subtype: PropTypes.string.isRequired
};

export default Robot;
