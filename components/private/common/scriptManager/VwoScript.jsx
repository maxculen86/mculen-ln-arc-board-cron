import React from 'react';
import { useAppContext } from 'fusion:context';

function VwoScript({ location }) {
    const { contextPath, deployment } = useAppContext();

    if (location !== 'head') return null;

    return (
        <script
            defer
            src={deployment(`${contextPath}/resources/js/LN/vwoScript.min.js`)}
        />
    );
}

export default VwoScript;
