/* eslint-disable react/no-danger */
import React from 'react';
import { useAppContext } from 'fusion:context';

const ScriptLogoEvent = () => {
    const { contextPath, deployment } = useAppContext();
    return (
        <script
            id="script-logo-event"
            defer
            type="text/javascript"
            src={deployment(
                `${contextPath}/resources/js/LN/scriptLogoEvent.min.js`
            )}
        />
    );
};

export default ScriptLogoEvent;
