import React from 'react';
import { FONT_BOLD, FONT_MEDIUM } from 'fusion:environment';

const FontPreloads = () => (
    <>
        <link
            rel="preload"
            as="font"
            type="font/woff2"
            href={FONT_BOLD}
            crossOrigin=""
        />
        <link
            rel="preload"
            as="font"
            type="font/woff2"
            href={FONT_MEDIUM}
            crossOrigin=""
        />
    </>
);

export default FontPreloads;
