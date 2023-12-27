import React from 'react';
import { useAppContext } from 'fusion:context';

const AdblockDetector = () => {
    const { contextPath, deployment } = useAppContext();
    return (
        <script
            defer
            src={deployment(
                `${contextPath}/resources/js/LN/scriptAdblockDetector.min.js`
            )}
        />
    );
};

export default AdblockDetector;
