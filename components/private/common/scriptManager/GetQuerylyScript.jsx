import React from 'react';
import { useAppContext } from 'fusion:context';

const GetQuerylyScript = () => {
    const { contextPath, deployment } = useAppContext();
    return (
        <script
            defer
            id="script-getQuerylyScript"
            src={deployment(
                `${contextPath}/resources/js/LN/getQuerylyScript.min.js`
            )}
        />
    );
};

export default GetQuerylyScript;
