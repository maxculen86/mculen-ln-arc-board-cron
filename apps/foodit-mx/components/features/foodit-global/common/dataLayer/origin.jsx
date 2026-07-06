import React from 'react';
import { useAppContext } from 'fusion:context';

function DataLayerOrigin() {
    const { contextPath, deployment } = useAppContext();
    return (
        <script
            async
            id="scriptDataLayerOrigin"
            type="text/javascript"
            src={deployment(
                `${contextPath}/resources/js/FOODIT/dataLayerOrigin.min.js`
            )}
        />
    );
}
export default DataLayerOrigin;
