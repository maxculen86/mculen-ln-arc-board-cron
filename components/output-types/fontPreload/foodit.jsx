/* eslint-disable react/prop-types */
import React from 'react';
import {
    FONT_PRUMO,
    ROBOTO_LIGHT,
    ROBOTO_REGULAR,
    ROBOTO_BOLD
} from 'fusion:environment';

export function FontPreload({ deployment, contextPath }) {
    return (
        <>
            <link
                href={deployment(`${contextPath}${FONT_PRUMO}`)}
                rel="preload"
                as="font"
            />
            <link
                href={deployment(`${contextPath}${ROBOTO_LIGHT}`)}
                rel="preload"
                as="font"
            />
            <link
                href={deployment(`${contextPath}${ROBOTO_REGULAR}`)}
                rel="preload"
                as="font"
            />
            <link
                href={deployment(`${contextPath}${ROBOTO_BOLD}`)}
                rel="preload"
                as="font"
            />
        </>
    );
}
