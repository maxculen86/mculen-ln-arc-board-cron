import React from 'react';
import { useAppContext } from 'fusion:context';

function AdblockDetector() {
    const { contextPath, deployment } = useAppContext();
    return (
        <script
            defer
            src={deployment(
                `${contextPath}/resources/js/LN/scriptAdblockDetector.min.js`
            )}
        />
    );
}

export default AdblockDetector;
