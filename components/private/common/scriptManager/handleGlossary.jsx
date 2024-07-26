import React from 'react';
import { useAppContext } from 'fusion:context';

export default function HandleGlossary() {
    const { deployment, contextPath } = useAppContext();

    return (
        <script
            type="application/javascript"
            src={deployment(
                `${contextPath}/resources/js/LN/handleGlossary.min.js`
            )}
            defer
        />
    );
}
