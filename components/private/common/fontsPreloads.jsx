import React from 'react';
import PropTypes from 'fusion:prop-types';
import { FONT_BOLD, FONT_PRUMO } from 'fusion:environment';
import { useAppContext } from 'fusion:context';
import { getWebFont } from './fontface';

const FontPreloads = ({ isLN10 = false }) => {
    const { contextPath, deployment } = useAppContext();

    return (
        <>
            <link
                rel="preload"
                as="font"
                type="font/woff2"
                href={getWebFont({
                    font: isLN10 ? FONT_PRUMO : FONT_BOLD,
                    contextPath,
                    deployment
                })}
                crossOrigin=""
            />
        </>
    );
};

FontPreloads.propTypes = {
    isLN10: PropTypes.boolean.isRequired
};

export default FontPreloads;
