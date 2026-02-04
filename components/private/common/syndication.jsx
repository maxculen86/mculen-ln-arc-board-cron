/* eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';

function Syndication({ type, subtype, syndication }) {
    const { external_distribution: externalDistribution, search } =
        syndication || {};

    if (!subtype) return null;
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
}

Syndication.propTypes = {
    type: PropTypes.string.isRequired,
    subtype: PropTypes.string.isRequired,
    syndication: PropTypes.shape({
        external_distribution: PropTypes.bool,
        search: PropTypes.bool
    }).isRequired
};

export default Syndication;
