/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import AMPIndex, { _AMPBoilerplate } from '../private/common/ampIndex';

/**
 * TODO: Resolver el tema de las canonicas
 * TODO: Resolver los datos estructurados por cada layout
 * TODO: Evaluar cuando incluir Content Security Policy (CSP)
 * @param {nodes} props
 */
const Amp = props => {
    const {
        arcSite,
        children,
        metaValue,
        Resource,
        layout,
        siteProperties: { title }
    } = props;
    return (
        <html amp={String.fromCodePoint(9889)} lang="es">
            <head>
                <meta charset="utf-8" />
                <script async src="https://cdn.ampproject.org/v0.js" />
                <title>{metaValue('title') || title || 'LA NACION'}</title>
                <link rel="canonical" href="https://lanacion.com.ar/" />
                <meta
                    name="viewport"
                    content="width=device-width,minimum-scale=1,initial-scale=1"
                />
                <AMPIndex layout={layout} arcSite={arcSite} />
                <Resource path="resources/dist/css/ln/base/amp.css">
                    {({ data }) => {
                        return data ? (
                            <style amp-custom="amp-custom">{data}</style>
                        ) : null;
                    }}
                </Resource>
                <style amp-boilerplate="">{_AMPBoilerplate}</style>
                <noscript
                    dangerouslySetInnerHTML={{
                        __html:
                            '<style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style>'
                    }}
                />
            </head>
            <body>{children}</body>
        </html>
    );
};

Amp.propTypes = {
    arcSite: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.nodes).isRequired,
    metaValue: PropTypes.func.isRequired,
    Resource: PropTypes.node.isRequired,
    layout: PropTypes.string.isRequired,
    siteProperties: PropTypes.shape({
        title: PropTypes.string
    }).isRequired
};

export default Amp;
