import React from 'react';
import PropTypes from 'fusion:prop-types';
import { subtypesWithAmp } from './utils/subtypes/subtypeHelper';
import get from './utils/get';

const LinkAmpHTML = props => {
    const { canonicalUrl, subtype } = props;

    const slash = canonicalUrl && canonicalUrl.slice(-1) !== '/' ? '/' : '';
    const hasAmpLink = get(subtypesWithAmp, subtype, false);

    return hasAmpLink && canonicalUrl ? (
        <link
            rel="amphtml"
            href={`https://www.lanacion.com.ar${canonicalUrl}${slash}?outputType=amp`}
        />
    ) : (
        <></>
    );
};

LinkAmpHTML.propTypes = {
    canonicalUrl: PropTypes.string.isRequired,
    subtype: PropTypes.string.isRequired
};

export default LinkAmpHTML;
