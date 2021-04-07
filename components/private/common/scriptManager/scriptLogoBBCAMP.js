import React from 'react';
import PropTypes from 'fusion:prop-types';

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

ScriptLogoBBCAMP.propTypes = {
    distributorName: PropTypes.string.isRequired
};

export default ScriptLogoBBCAMP;
