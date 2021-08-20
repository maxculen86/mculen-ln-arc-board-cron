/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';

const Placeholder = props => {
    const { slotName, targeting, dimensions, missDfpId, error } = props;

    const style = {
        alignItems: 'center',
        width: '300px',
        minHeigth: '250px',
        backgroundColor: missDfpId || error ? 'red' : 'lightgray',
        margin: '3px'
    };

    if (missDfpId) {
        return (
            <div id="placeholder" className="no-dfpid" style={style}>
                FALTA DFP ID
            </div>
        );
    }

    return (
        <>
            <div id="placeholder" style={style}>
                <h2>Banner {error}</h2>
                <p>{`Slot: ${slotName}`}</p>
                <p>{`Targeting: ${JSON.stringify(targeting)}`}</p>
                <p>{`Dimensions: ${JSON.stringify(dimensions)}`}</p>
            </div>
        </>
    );
};

Placeholder.propTypes = {
    slotName: PropTypes.string.isRequired,
    targeting: PropTypes.oneOfType([PropTypes.object]).isRequired,
    dimensions: PropTypes.oneOfType([PropTypes.array]).isRequired,
    missDfpId: PropTypes.bool,
    error: PropTypes.string
};

export default Placeholder;
