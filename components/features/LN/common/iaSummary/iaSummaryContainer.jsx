import React from 'react';
import IaSummary from './default';

function IaSummaryContainer({ isOpen, summaryData, onClose }) {
    if (!isOpen) return null;

    return (
        <IaSummary
            id={summaryData.id}
            contentData={summaryData}
            onClose={onClose}
        />
    );
}

export default IaSummaryContainer;
