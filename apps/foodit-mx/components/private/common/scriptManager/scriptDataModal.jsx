import React from 'react';
import { useAppContext } from 'fusion:context';

function ScriptDataModal() {
    const { contextPath, deployment } = useAppContext();
    return (
        <script
            defer
            src={deployment(
                `${contextPath}/resources/js/LN/scriptDataModal.min.js`
            )}
        />
    );
}

export default ScriptDataModal;
