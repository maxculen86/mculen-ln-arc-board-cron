import React from 'react';
import Consumer from 'fusion:consumer';
import PageBuilderMessage from '../../LN/home/common/components/pageBuilderMessage/pageBuilderMessage';

function WarningMessage({ featureId, type, message }) {
    return (
        <div
            style={{
                marginTop: '10px',
                marginBottom: '10px',
                width: '100%'
            }}
        >
            <PageBuilderMessage key={featureId} type={type} message={message} />
        </div>
    );
}

export default Consumer(WarningMessage);
