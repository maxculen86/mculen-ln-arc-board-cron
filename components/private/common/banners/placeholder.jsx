import React from 'react';

function Placeholder({
    slotName,
    targeting,
    dimensions,
    missDfpId = false,
    error = ''
}) {
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
        <div id="placeholder" style={style}>
            <h2>Banner {error}</h2>
            <p>{`Slot: ${slotName}`}</p>
            <p>{`Targeting: ${JSON.stringify(targeting)}`}</p>
            <p>{`Dimensions: ${JSON.stringify(dimensions)}`}</p>
        </div>
    );
}

export default Placeholder;
