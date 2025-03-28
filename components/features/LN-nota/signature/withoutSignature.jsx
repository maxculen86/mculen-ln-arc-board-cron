import React from 'react';
import PropTypes from 'fusion:prop-types';

function WithoutSignature({ audioButton, showWithoutSignature }) {
    if (!showWithoutSignature || !audioButton) return null;

    return <div className="flex flex-column brand-color">{audioButton}</div>;
}

WithoutSignature.propTypes = {
    audioButton: PropTypes.node.isRequired,
    showWithoutSignature: PropTypes.bool.isRequired
};

export default WithoutSignature;
