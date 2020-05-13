import React from 'react';
import PropTypes from 'fusion:prop-types';

const index = props => {
    const { slotId, slotName, dimensions, targeting } = props;

    return (
        <amp-ad
            id={`${slotId}`}
            type="doubleclick"
            class="banner"
            width={dimensions.width}
            height={dimensions.height}
            data-slot={slotName}
            json={`${targeting}`}
        />
    );
};

index.propTypes = {
    slotId: PropTypes.string.isRequired,
    slotName: PropTypes.string.isRequired,
    dimensions: PropTypes.shape({
        width: PropTypes.string,
        height: PropTypes.string
    }).isRequired,
    targeting: PropTypes.string.isRequired
};

export default index;
