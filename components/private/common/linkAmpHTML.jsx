import React from 'react';
import PropTypes from 'fusion:prop-types';
import get from './utils/get';
import {
    subtypesWithAmp,
    subtypeNotesWithoutAmp
} from './utils/subtypes/subtypeHelper';

const LinkAmpHTML = props => {
    const { subtype = '', canonicalUrl = '', nodeType } = props;

    const hasAmpLink = get(
        subtypesWithAmp,
        subtype || nodeType || '',
        undefined
    );
    const slash = canonicalUrl && canonicalUrl.slice(-1) !== '/' ? '/' : '';

    const validateSubtype = subtypeNotesWithoutAmp(canonicalUrl);

    return hasAmpLink && canonicalUrl && !validateSubtype ? (
        <link
            rel="amphtml"
            href={`https://www.lanacion.com.ar${canonicalUrl}${slash}?outputType=amp`}
        />
    ) : (
        <></>
    );
};
LinkAmpHTML.propTypes = {
    subtype: PropTypes.string.isRequired,
    canonicalUrl: PropTypes.string.isRequired,
    nodeType: PropTypes.string.isRequired
};
export default LinkAmpHTML;
