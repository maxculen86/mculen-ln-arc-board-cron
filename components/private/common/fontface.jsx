import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';

export const getStyleFontsInLine = ({ contextPath, deployment }) => `
@font-face {font-family:'LNicons';src:url('${deployment(
    `${contextPath}/resources/fonts/lana-icons-v1.woff`
)}') format('woff');font-weight: normal;font-style: normal;font-display: swap;} @font-face {font-family:'SuecaSlab';src:url('${deployment(
    `${contextPath}/resources/fonts/suecaslab-medium-webfont.woff2`
)}') format('woff2');font-weight: 500;font-style: normal;font-display: swap;} @font-face {font-family:'SuecaSlab';src:url('${deployment(
    `${contextPath}/resources/fonts/suecaslab-bold-webfont.woff2`
)}') format('woff2');font-weight: 700;font-style: normal;font-display: swap;} @font-face {font-family:'LNlogos';src:url('${deployment(
    `${contextPath}/resources/fonts/lana-logos-v1.woff`
)}') format('woff');font-weight: normal;font-style: normal;font-display: swap;}
`;

const FontFace = props => {
    const { outputType } = props;
    const { contextPath, deployment } = useAppContext();

    return (
        <>
            {/* <link 
                rel="preload"
                href={deployment(
                    `${contextPath}/resources/images/logo-lanacion.svg`
                )}
                as="image"
                crossorigin="anonymous"
            /> */}
            <link
                rel="preload"
                href={deployment(
                    `${contextPath}/resources/fonts/lana-icons-v1.woff`
                )}
                as="font"
                crossorigin="anonymous"
            />
            <link
                rel="preload"
                href={deployment(
                    `${contextPath}/resources/fonts/suecaslab-medium-webfont.woff2`
                )}
                as="font"
                crossorigin="anonymous"
            />
            <link
                rel="preload"
                href={deployment(
                    `${contextPath}/resources/fonts/suecaslab-bold-webfont.woff2`
                )}
                as="font"
                crossorigin="anonymous"
            />
            <link
                rel="preload"
                href={deployment(
                    `${contextPath}/resources/fonts/lana-logos-v1.woff`
                )}
                as="font"
                onload="this.onload=null;this.rel='stylesheet'"
                crossorigin="anonymous"
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
    contextPath: PropTypes.string.isRequired,
    deployment: PropTypes.func.isRequired
};

export default FontFace;
