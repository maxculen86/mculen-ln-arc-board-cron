/* eslint-disable react/no-danger */
import React from 'react';

function htmllibre(props) {
    const {
        globalContent: { content_elements: contentElements }
    } = props;
    const content =
        contentElements[0] && contentElements[0].content
            ? contentElements[0].content
            : undefined;

    return content ? (
        <html lang="es">
            <body>
                <div
                    dangerouslySetInnerHTML={{
                        __html: content
                    }}
                />
            </body>
        </html>
    ) : null;
}

export default htmllibre;
