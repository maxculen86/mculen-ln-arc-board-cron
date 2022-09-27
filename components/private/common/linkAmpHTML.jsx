import React from 'react';
import PropTypes from 'fusion:prop-types';

const LinkAmpHTML = props => {
    const { canonicalUrl, hasAmpLink } = props;

    const slash = canonicalUrl && canonicalUrl.slice(-1) !== '/' ? '/' : '';

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
    hasAmpLink: PropTypes.string.isRequired
};

export default LinkAmpHTML;
