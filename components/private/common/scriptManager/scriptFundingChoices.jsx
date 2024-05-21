import React from 'react';

const FundingChoices = () => {
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
};

export default FundingChoices;
