/* eslint-disable react/no-danger */
import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import { addMetaNoIndexNoFollow } from '../private/common/utils/outputTypeHelper';
import { fontFaceLn10 } from '../features/LN-10-global/fontFace/default';

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
                                ${fontFaceLn10({
                                    contextPath,
                                    deployment
                                })}
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

function Widgets(props) {
    const {
        children,
        globalContent = {},
        CssLinks,
        contextPath,
        deployment,
        outputType
    } = props || {};
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
                {addMetaNoIndexNoFollow({ outputType })}
            </head>
            <body>
                <section className="widget">
                    {children}
                    {bodyBottom}
                </section>
            </body>
        </html>
    );
}

export default Widgets;
