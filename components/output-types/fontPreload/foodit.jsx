/* eslint-disable react/prop-types */
import React from 'react';
import { FONT_PRUMO } from 'fusion:environment';

export function FontPreload({ deployment, contextPath }) {
    return (
        <link
            href={deployment(`${contextPath}${FONT_PRUMO}`)}
            rel="preload"
            as="font"
        />
    );
}
