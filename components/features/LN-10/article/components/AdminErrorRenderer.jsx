import React from 'react';
import WarningMessage from '../../../../private/common/warningMessage/warningMessage';
import get from '../../../../private/common/utils/get';

function AdminErrorRenderer({ featureId, error }) {
    if (!error) {
        return <article data-feature-id={featureId} />;
    }

    return (
        <article data-feature-id={featureId}>
            <WarningMessage
                key={featureId}
                type={get(error, 'type', 'error')}
                message={get(error, 'message', '')}
            />
        </article>
    );
}

export default AdminErrorRenderer;
