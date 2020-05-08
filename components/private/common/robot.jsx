import React from 'react';
import PropTypes from 'fusion:prop-types';

const Robot = ({ subtype, canonicalUrl, arcSite }) => {
    if (arcSite && arcSite !== 'la-nacion-ar' && !subtype && !canonicalUrl)
        return <></>;

    return (
        subtype === '1' &&
        canonicalUrl && (
            <link
                rel="canonical"
                href={`https://www.lanacion.com.ar${canonicalUrl}`}
            />
        )
    );
};

Robot.propTypes = {
    subtype: PropTypes.string,
    canonicalUrl: PropTypes.string.isRequired
};

export default Robot;
