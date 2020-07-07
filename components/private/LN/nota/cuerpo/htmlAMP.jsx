/* eslint-disable react/no-danger */

import React from 'react';
import { renderToString } from 'react-dom/server';
import PropTypes from 'fusion:prop-types';

import config from '../../../../../properties/sites/la-nacion-ar';

const hasOptaElements = content => content.includes('opta-widget');

const HtmlBoilerplate = ({ opta, children }) => {
    const script = `
        var opta_settings = {
            subscription_id: '${config.optaConfig.subscription_id}',
            language: '${config.optaConfig.language}',
            timezone: '${config.optaConfig.timezone}'
        };
    `;

    return (
        <>
            <html lang="en">
                <head>
                    <meta charset="utf-8" />
                    <title>Embed Html</title>
                    {opta && (
                        <link
                            rel="stylesheet"
                            href="https://secure.widget.cloud.opta.net/v3/css/v3.all.opta-widgets.css"
                        />
                    )}
                </head>
                <body>
                    <div
                        style={{ width: '800px;', padding: '20px;' }}
                        dangerouslySetInnerHTML={{ __html: children }}
                    />
                    {opta && (
                        <>
                            <script src="https://secure.widget.cloud.opta.net/v3/v3.opta-widgets.js" />
                            <script
                                dangerouslySetInnerHTML={{ __html: script }}
                            />
                        </>
                    )}
                </body>
            </html>
        </>
    );
};

HtmlBoilerplate.propTypes = {
    opta: PropTypes.bool.isRequired
};

const HtmlAMP = props => {
    const { data } = props;
    const { content } = data || { content: null };

    const html = renderToString(
        React.createElement(
            HtmlBoilerplate,
            {
                opta: hasOptaElements(content)
            },
            content
        )
    );

    return (
        <div className="com-embed --html">
            <amp-iframe
                width="540"
                height="300"
                sandbox="allow-scripts allow-same-origin"
                layout="responsive"
                frameborder="0"
                src="https://proxy.lanacion.com.ar:3000/?url=http://arc.lanacion.com.ar/opta/?_website=la-nacion-ar&opta=true&outputType=opta"
            />
        </div>
    );
};

HtmlAMP.arcType = 'raw_html';
HtmlAMP.outputType = 'amp';
HtmlAMP.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string
    }).isRequired
};

export default HtmlAMP;
