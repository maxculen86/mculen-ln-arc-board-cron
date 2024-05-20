import React from 'react';

const FundingChoices = () => {
    const scriptContent = `
        // Make sure that the googlefc property exists on the window.
        window.googlefc = window.googlefc || {};
        // To guarantee functionality, this must go before the FC tag on the page.
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
};

export default FundingChoices;
