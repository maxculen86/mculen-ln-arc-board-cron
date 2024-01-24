/* eslint-disable react/no-danger */
import React from 'react';
import { useAppContext } from 'fusion:context';

export default function SubHeaderEventsScript() {
    const { contextPath, deployment } = useAppContext();

    return (
        <script
            id="script-sub-header-events"
            src={deployment(
                `${contextPath}/resources/js/LN/subHeaderEventsScript.min.js`
            )}
        />
    );
}
