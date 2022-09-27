import React from 'react';
import PropTypes from 'fusion:prop-types';

const Robot = props => {
    const { canonicalUrl, hasAmpLink } = props;
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
    hasAmpLink: PropTypes.string.isRequired,
    canonicalUrl: PropTypes.string.isRequired
};

export default Robot;
