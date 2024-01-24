/* eslint-disable react/no-danger */
import React from 'react';
import { useAppContext } from 'fusion:context';

export default function RoofEventsScript() {
    const { contextPath, deployment } = useAppContext();

    return (
        <script
            id="script-roof-events"
            src={deployment(
                `${contextPath}/resources/js/LN/roofEventsScript.min.js`
            )}
        />
    );
}
