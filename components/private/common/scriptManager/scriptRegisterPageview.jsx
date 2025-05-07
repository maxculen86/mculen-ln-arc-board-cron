import React from 'react';
import { useAppContext } from 'fusion:context';

function ScriptRegisterPageview() {
    const { contextPath, deployment } = useAppContext();
    return (
        <script
            defer
            id="scriptRegisterPageview"
            type="text/javascript"
            src={deployment(
                `${contextPath}/resources/js/LN/scriptPageview.min.js`
            )}
        />
    );
}

export default ScriptRegisterPageview;
