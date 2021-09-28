/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';

const Widget = props => {
    const { children } = props;
    const script = `
        console.log('Hola mundo');
    `;
    return (
        <html lang="es">
            <head>
                <title>Widgets</title>
                <script
                    di="WIDGET_SCRIPT"
                    dangerouslySetInnerHTML={{ __html: script }}
                />
                <noscript>Your browser does not suport javascript</noscript>
            </head>
            <body>{children}</body>
        </html>
    );
};

Widget.propTypes = {
    children: PropTypes.node.isRequired
};

export default Widget;
