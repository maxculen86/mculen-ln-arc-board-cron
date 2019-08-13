import React from 'react';
import PropTypes from 'fusion:prop-types';

const bannerPlaceholder = ({ slotName, targeting, dimensions, missDfpId }) => {
    const style = {
        alignItems: 'center',
        width: '300px',
        heigth: '250px',
        backgroundColor: missDfpId ? 'red' : 'lightgray',
        margin: '3px'
    };

    if (missDfpId) {
        return <div style={style}>FALTA DFP ID</div>;
    }

    return (
        <div style={style}>
            <h2>Banner</h2>
            <p>{`Slot: ${slotName}`}</p>
            <p>{`Targeting: ${JSON.stringify(targeting)}`}</p>
            <p>{`Dimensions: ${JSON.stringify(dimensions)}`}</p>
        </div>
    );
};

bannerPlaceholder.propTypes = {
    slotName: PropTypes.string.isRequired,
    targeting: PropTypes.isRequired,
    dimensions: PropTypes.isRequired,
    missDfpId: PropTypes.bool
};

bannerPlaceholder.defaultProps = {
    missDfpId: false
};

export default bannerPlaceholder;
