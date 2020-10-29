import React from 'react';
import PropTypes from 'fusion:prop-types';
import get from './utils/get';

const MetaRobots = ({ syndication, type, subtype, outputType }) => {
    const search = get(syndication, 'search', null);
    if (outputType !== 'default' && outputType !== 'amp') return null;
    if (type !== 'story' || subtype === '7') return null;
    if (!search) return null;
    return <meta name="robots" content="max-image-preview:large" />;
};

MetaRobots.propTypes = {
    type: PropTypes.string.isRequired,
    outputType: PropTypes.string.isRequired,
    syndication: PropTypes.shape({
        search: PropTypes.bool
    }),
    subtype: PropTypes.string.isRequired
};

MetaRobots.defaultProps = {
    syndication: undefined
};

export default MetaRobots;
