import React from 'react';
import PropTypes from 'fusion:prop-types';

const Syndication = ({ subtype, syndication, arcSite }) => {
    const { external_distribution: externalDistribution, search } =
        syndication || {};

    if (arcSite && arcSite !== 'la-nacion-ar' && !subtype) return <></>;

    return (
        subtype !== '7' &&
        syndication !== undefined &&
        ((!externalDistribution && !search) ||
            (!search && externalDistribution)) && (
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
