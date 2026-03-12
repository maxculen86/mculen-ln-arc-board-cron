import React from 'react';

function TransparencyDiv({ size }) {
    return (
        <div
            data-event="LinkClick"
            data-section="TransparencyNota"
            className="transparency"
            style={{ heigth: `${size}px` }}
        />
    );
}

export default TransparencyDiv;
