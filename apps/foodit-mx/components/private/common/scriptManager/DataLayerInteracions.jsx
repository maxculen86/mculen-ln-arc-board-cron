import React from 'react';
import { useAppContext } from 'fusion:context';

function DataLayerInteractions() {
    const { deployment, contextPath } = useAppContext();
    return (
        <script
            defer
            type="application/javascript"
            src={deployment(
                `${contextPath}/resources/js/LN/dataLayerInteractions.min.js`
            )}
        />
    );
}

export default DataLayerInteractions;
