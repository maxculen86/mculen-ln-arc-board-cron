import React from 'react';
import { useAppContext } from 'fusion:context';

const ScriptViewability = () => {
    const { deployment, contextPath } = useAppContext();
    return (
        <script
            id="script-viewability"
            defer
            type="text/javascript"
            src={deployment(
                `${contextPath}/resources/js/LN/scriptViewability.min.js`
            )}
        />
    );
};

export default ScriptViewability;
