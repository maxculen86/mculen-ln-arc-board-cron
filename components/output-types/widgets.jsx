/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';

const TAGS_BY_WIDGET = {
    viafoura: globalContent => {
        const { _id } = globalContent;
        return (
            (_id && {
                head: [
                    <meta name="vf:container_id" content={_id} />,
                    <meta name="vf:lang" content="es" />
                ],
                bodyBottom: [
                    <script
                        id="VIAFOURA"
                        type="text/javascript"
                        async
                        src="//cdn.viafoura.net/vf-v2.js"
                    />
                ]
            }) ||
            {}
        );
    }
};

const Widgets = props => {
    const { children, globalContent = {} } = props || {};
    const { widget } = globalContent;
    const widgetScripts = TAGS_BY_WIDGET[widget];
    const { head, bodyBottom } =
        (widgetScripts && widgetScripts(globalContent)) || {};

    return (
        <html lang="es">
            <head>
                <title>Widgets</title>
                {head}
                <noscript>Your browser does not suport javascript</noscript>
            </head>
            <body>
                {children}
                {bodyBottom}
            </body>
        </html>
    );
};

Widgets.propTypes = {
    children: PropTypes.node.isRequired,
    globalContent: PropTypes.shape({
        _id: PropTypes.string
    }).isRequired
};

export default Widgets;
