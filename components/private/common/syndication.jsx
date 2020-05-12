import React from 'react';
import PropTypes from 'fusion:prop-types';

const Syndication = ({ subtype, externalDistribution, search, arcSite }) => {
    if (arcSite && arcSite !== 'la-nacion-ar' && !subtype) return <></>;

    return (
        subtype === '1' &&
        ((!externalDistribution && !search) || externalDistribution) && (
            <meta name="robots" content="noindex, follow" />
        )
    );
};

Syndication.propTypes = {
    subtype: PropTypes.string,
    externalDistribution: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
};

export default Syndication;
