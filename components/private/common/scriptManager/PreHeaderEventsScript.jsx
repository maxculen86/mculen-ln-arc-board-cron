/* eslint-disable react/no-danger */
import React from 'react';
import { useAppContext } from 'fusion:context';

export default function PreHeaderEventsScript() {
    const { contextPath, deployment } = useAppContext();
    return (
        <script
            id="script-pre-header-event"
            src={deployment(
                `${contextPath}/resources/js/LN/preHeaderEventsScript.min.js`
            )}
        />
    );
}
