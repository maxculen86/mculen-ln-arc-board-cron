/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import {
    FONT_BOLD,
    FONT_MEDIUM,
    FONT_PRUMO,
    FONT_PRUMO_ITALIC
} from 'fusion:environment';

export const getWebFont = ({ font, deployment, contextPath }) =>
    `${deployment(contextPath + font)}`;

// TODO: borrar cuando se cambie la tipo en todo el sitio
export const getStyleFontsInLine = ({ contextPath, deployment }) => `
@font-face {font-family:'SuecaSlab';src:url('${getWebFont({
    font: FONT_BOLD,
    contextPath,
    deployment
})}') format('woff2');font-weight: 700;font-style: normal;font-display: auto;}
@font-face {font-family:'SuecaSlab';src:url('${getWebFont({
    font: FONT_MEDIUM,
    contextPath,
    deployment
})}') format('woff2');font-weight: 500;font-style: normal;font-display: auto;}
`; // NOSONAR;

export const getStyleFontsInLineForLN10 = ({ contextPath, deployment }) => `
@font-face {font-family:'Prumo';src:url('${getWebFont({
    font: FONT_PRUMO,
    contextPath,
    deployment
})}') format('woff2');font-weight: 90; font-display: auto;}
@font-face {font-family:'Prumo Italic';src:url('${getWebFont({
    font: FONT_PRUMO_ITALIC,
    contextPath,
    deployment
})}') format('woff2');font-weight: 90;font-display: auto;}
`; // NOSONAR;

const FontFace = props => {
    const { outputType } = props;
    const { contextPath, deployment } = useAppContext();

    return (
        <>
            <link
                rel="preload"
                href={deployment(
                    `${contextPath}/resources/fonts/lana-logos-v1.woff`
                )}
                as="font"
                onLoad="this.onload=null;this.rel='stylesheet'"
                crossOrigin="anonymous"
            />
            {outputType === 'default' && (
                <style
                    dangerouslySetInnerHTML={{
                        __html: getStyleFontsInLine({ contextPath, deployment })
                    }}
                />
            )}
        </>
    );
};

FontFace.propTypes = {
    outputType: PropTypes.string.isRequired
};

export default FontFace;
