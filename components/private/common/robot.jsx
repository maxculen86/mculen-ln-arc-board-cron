import React from 'react';
import PropTypes from 'fusion:prop-types';

const Robot = ({ subtype, canonicalUrl }) => {
    return (
        subtype !== 7 && (
            <>
                <meta name="robots" content="noindex, nofollow" />
                <link
                    rel="canonical"
                    href={`https://www.lanacion.com.ar/${canonicalUrl}`}
                />
            </>
        )
    );
};

Robot.propTypes = {
    subtype: PropTypes.string,
    canonicalUrl: PropTypes.string.isRequired
};

export default Robot;
