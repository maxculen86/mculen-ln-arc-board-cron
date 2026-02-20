import React from 'react';

function WithoutSignature({
    audioButton,
    showWithoutSignature,
    showListenButton
}) {
    if (!showWithoutSignature || !showListenButton) return null;

    return <div className="flex flex-column brand-color">{audioButton}</div>;
}

export default WithoutSignature;
