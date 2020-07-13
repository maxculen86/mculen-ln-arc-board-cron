import React from 'react';
import PropTypes from 'fusion:prop-types';

import config from '../../properties/sites/la-nacion-ar';

const Opta = props => {
    const { Fusion, children } = props;
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
                <div id="fusion-app">{children}</div>
                {/* <Fusion /> */}
            </body>
        </html>
    );
};

export default Opta;
