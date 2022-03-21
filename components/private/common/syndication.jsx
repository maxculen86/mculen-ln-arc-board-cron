/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';

const Syndication = ({ type, subtype, syndication, arcSite, outputType }) => {
    const { external_distribution: externalDistribution, search } =
        syndication || {};

    if (arcSite && arcSite !== 'la-nacion-ar' && !subtype) return <></>;
    if (outputType !== 'default' && outputType !== 'amp') return null;
    if (type !== 'story') return null;

    return subtype !== '7' &&
        syndication !== undefined &&
        ((!externalDistribution && !search) ||
            (!search && externalDistribution)) ? (
        <meta
            name="robots"
            content="noindex, follow, max-image-preview:large"
        />
    ) : (
        <meta name="robots" content="max-image-preview:large" />
    );
};

Syndication.propTypes = {
    arcSite: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    outputType: PropTypes.string,
    subtype: PropTypes.string.isRequired,
    syndication: PropTypes.shape({
        external_distribution: PropTypes.bool,
        search: PropTypes.bool
    }).isRequired
};

export default Syndication;
