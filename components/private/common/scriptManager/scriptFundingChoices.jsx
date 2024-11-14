/* eslint-disable react/no-danger */
import React from 'react';

function FundingChoices() {
    const scriptContent = `
        window.googlefc = window.googlefc || {};
        googlefc.controlledMessagingFunction = function (message) {
            message.proceed(true);
        };
    `;

    return (
        <script
            id="fundingChoices"
            async
            defer
            type="text/javascript"
            dangerouslySetInnerHTML={{
                __html: scriptContent
            }}
        />
    );
}

export default FundingChoices;
