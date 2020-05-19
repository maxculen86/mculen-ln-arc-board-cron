import React from 'react';
import PropTypes from 'fusion:prop-types';

const BotonLink = ({ data }) => {
    const { url, content } = data || {};
    return <>{url && content ? <a href={url}>{content}</a> : null}</>;
};

BotonLink.arcType = 'interstitial_link';

BotonLink.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string.isRequired,
        level: PropTypes.number,
        type: PropTypes.string.isRequired
    }).isRequired
};

export default BotonLink;
