/* eslint-disable react/no-danger */
import React from 'react';
import { useAppContext } from 'fusion:context';
import config from '../../properties/sites/la-nacion-ar';
import { addMetaNoIndexNoFollow } from '../private/common/utils/outputTypeHelper';

//APPS USA ESTE OUTPUT-TYPE, NO BORRAR.
const Opta = props => {
    const { globalContent, outputType } = props;
    const { content_elements: contentElement } = globalContent || {};
    const { content = '' } = contentElement || {};
    const { deployment, contextPath } = useAppContext();
    const { subscription_id, language, timezone } = { ...config.optaConfig };

    return (
        <html lang="es">
            <head>
                <title>Opta Embeds</title>
                <script
                    id="script-opta"
                    defer
                    data-subscriptionId={subscription_id}
                    data-language={language}
                    data-timezone={timezone}
                    type="text/javascript"
                    src={deployment(
                        `${contextPath}/resources/js/LN/optaEmbed.min.js`
                    )}
                />
                {addMetaNoIndexNoFollow({ outputType })}
            </head>
            <body>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </body>
        </html>
    );
};

export default Opta;
