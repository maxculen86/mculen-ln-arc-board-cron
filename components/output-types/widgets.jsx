/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { SITE_LANACION } from 'fusion:environment';

const TAGS_BY_WIDGET = {
    viafoura: ({ globalContent, contextPath, deployment }) => {
        const {
            _id,
            canonical_url: canonicalUrl = '',
            headlines: { mobile, basic } = {}
        } = globalContent || {};
        const title = mobile || basic;
        const domain = SITE_LANACION.replace(
            /^(?:https?:\/\/)?(?:www\.)?/i,
            ''
        );

        const webFont = deployment(
            `${contextPath}/resources/fonts/suecaslab-bold-webfont.woff2`
        );

        return (
            (_id && {
                head: [
                    <meta name="vf:container_id" content={_id} />,
                    <meta name="vf:lang" content="es" />,
                    <meta name="vf:domain" content={domain} />,
                    <meta
                        name="vf:url"
                        content={`${SITE_LANACION}${canonicalUrl}`}
                    />,
                    <meta name="vf:title" content={title} />,
                    <meta
                        name="viewport"
                        content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
                    />,
                    <style
                        dangerouslySetInnerHTML={{
                            __html: `
                                .widget {
                                    padding: 32px 16px 0;
                                }
                                @font-face {
                                    font-family: 'SuecaSlab';
                                    src: url('${webFont}') format('woff2');
                                    font-weight: 700;
                                    font-style: normal;
                                    font-display: swap;
                                }
                            `
                        }}
                    />
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
    const { children, globalContent = {}, CssLinks, contextPath, deployment } =
        props || {};
    const { widget } = globalContent;
    const widgetScripts = TAGS_BY_WIDGET[widget];
    const { head, bodyBottom } =
        (widgetScripts &&
            widgetScripts({ globalContent, contextPath, deployment })) ||
        {};

    return (
        <html lang="es">
            <head>
                <title>Widgets</title>
                {head}
                <noscript>Your browser does not suport javascript</noscript>
                <CssLinks />
            </head>
            <body>
                <section className="widget">
                    {children}
                    {bodyBottom}
                </section>
            </body>
        </html>
    );
};

Widgets.propTypes = {
    globalContent: PropTypes.shape({
        _id: PropTypes.string
    }).isRequired
};

export default Widgets;
