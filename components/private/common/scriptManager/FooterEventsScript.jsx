/* eslint-disable react/no-danger */
import React from 'react';
import { useAppContext } from 'fusion:context';

export default function FooterEventsScript() {
    const { contextPath, deployment } = useAppContext();

    return (
        <script
            defer
            id="script-footer-events"
            src={deployment(
                `${contextPath}/resources/js/LN/footerEventsScript.min.js`
            )}
        />
    );
}
