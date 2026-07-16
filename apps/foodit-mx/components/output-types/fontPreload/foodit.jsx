/* eslint-disable react/prop-types */
import React from 'react';
import { ROBOTO_REGULAR, FONT_PRUMO } from 'fusion:environment';

export function FontPreload({ deployment, contextPath }) {
    return (
        <>
            <link
                href={deployment(`${contextPath}${ROBOTO_REGULAR}`)}
                rel="preload"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
            />
            <link
                href={deployment(`${contextPath}${FONT_PRUMO}`)}
                rel="preload"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
            />
        </>
    );
}
