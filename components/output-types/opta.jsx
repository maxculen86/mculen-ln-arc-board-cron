/* eslint-disable react/no-danger */
import React from 'react';
import config from '../../properties/sites/la-nacion-ar';

const Opta = props => {
    const { globalContent } = props;
    const { content_elements: contentElement } = globalContent || {};
    const { content = '' } = contentElement || {};

    const script = `
        var opta_settings = {
            subscription_id: '${config.optaConfig.subscription_id}',
            language: '${config.optaConfig.language}',
            timezone: '${config.optaConfig.timezone}'
        };
    `;

    const style = `https://secure.widget.cloud.opta.net/v3/css/v3.all.opta-widgets.css`;

    return (
        <html lang="es">
            <head>
                <title>Opta Embeds</title>
                <link rel="stylesheet" href={style} />
                <script src="https://secure.widget.cloud.opta.net/v3/v3.opta-widgets.js" />
                <script dangerouslySetInnerHTML={{ __html: script }} />
                <noscript>Your browser does not suport javascript</noscript>
            </head>
            <body>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </body>
        </html>
    );
};

export default Opta;
