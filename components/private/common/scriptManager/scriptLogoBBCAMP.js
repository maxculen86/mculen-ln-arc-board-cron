import React from 'react';

const ScriptLogoBBCAMP = ({ distributorName }) => {
    const data = `{
        "vars": { "syndication-partner":"lanacion.com","language":"mundo" },
        "triggers": {
            "trackPageview": { "on":"visible","request":"wsStoryView" }
        }
    }`;

    return distributorName === 'BBC Mundo' ? (
        <amp-analytics config="https://news.files.bbci.co.uk/ws/partner-analytics/ampAnalyticsConfig.json">
            <script
                type="application/json"
                dangerouslySetInnerHTML={{
                    __html: data
                }}
            />
        </amp-analytics>
    ) : null;
};

export default ScriptLogoBBCAMP;
