import React from 'react';
import { FONT_BOLD } from 'fusion:environment';
import { useAppContext } from 'fusion:context';
import { getWebFont } from './fontface';

const FontPreloads = () => {
    const { contextPath, deployment } = useAppContext();

    return (
        <>
            <link
                rel="preload"
                as="font"
                type="font/woff2"
                href={getWebFont({ font: FONT_BOLD, contextPath, deployment })}
                crossOrigin=""
            />
        </>
    );
};

export default FontPreloads;
