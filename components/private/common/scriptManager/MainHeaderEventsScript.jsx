import React from 'react';
import { useAppContext } from 'fusion:context';

export default function MainHeaderEventsScript() {
    const { deployment, contextPath } = useAppContext();
    return (
        <script
            defer
            id="script-main-header-events"
            src={deployment(
                `${contextPath}/resources/js/LN/mainHeaderEventsScript.min.js`
            )}
        />
    );
}
