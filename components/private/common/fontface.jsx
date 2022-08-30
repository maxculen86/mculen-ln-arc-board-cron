/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { FONT_BOLD, FONT_MEDIUM } from 'fusion:environment';

export const getWebFont = ({ font, deployment, contextPath }) =>
    `${deployment(contextPath + font)}`;

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

// @font-face {font-family:'LNicons';src:url('${deployment(
//     `${contextPath}/resources/fonts/lana-icons-v1.woff`
// )}') format('woff');font-weight: normal;font-style: normal;font-display: swap;}
// <link
//     rel="preload"
//     href={deployment(
//         `${contextPath}/resources/fonts/lana-icons-v1.woff`
//     )}
//     as="font"
//     crossorigin="anonymous"
// />
