import React from 'react';
import PropTypes from 'fusion:prop-types';

import Consumer from 'fusion:consumer';

import PageBuilderMessage from '../../LN/home/common/components/pageBuilderMessage/pageBuilderMessage';

const WarningMessage = ({ featureId, type, message }) => {
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
};

WarningMessage.propTypes = {
    featureId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};
export default Consumer(WarningMessage);
