import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';

const FontFace = props => {
    const { contextPath, deployment } = useAppContext();

    return (
        <>
            <link
                rel="preload"
                href={deployment(
                    `${contextPath}/resources/fonts/lana-icons-v1.woff`
                )}
                as="font"
                crossorigin
            />
            <link
                rel="preload"
                href={deployment(
                    `${contextPath}/resources/fonts/suecaslab-medium-webfont.woff2`
                )}
                as="font"
                crossorigin
            />
            <link
                rel="preload"
                href={deployment(
                    `${contextPath}/resources/fonts/suecaslab-bold-webfont.woff2`
                )}
                as="font"
                crossorigin
            />
            <link
                rel="preload"
                href={deployment(
                    `${contextPath}/resources/fonts/lana-logos-v1.woff`
                )}
                as="font"
                onload="this.onload=null;this.rel='stylesheet'"
            />
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                    @font-face {
                        font-family: 'LNicons';
                        src: url('${deployment(
                            `${contextPath}/resources/fonts/lana-icons-v1.woff`
                        )}') format('woff');
                        font-weight: normal;
                        font-style: normal;
                        font-display: swap;
                    }
                    @font-face {
                        font-family: 'SuecaSlab';
                        src: url('${deployment(
                            `${contextPath}/resources/fonts/suecaslab-medium-webfont.woff2`
                        )}') format('woff2');
                        font-weight: 500;
                        font-style: normal;
                        font-display: swap;
                    }
                    @font-face {
                        font-family: 'SuecaSlab';
                        src: url('${deployment(
                            `${contextPath}/resources/fonts/suecaslab-bold-webfont.woff2`
                        )}') format('woff2');
                        font-weight: 700;
                        font-style: normal;
                        font-display: swap;
                    }
                    @font-face {
                        font-family: 'LNlogos';
                        src: url('${deployment(
                            `${contextPath}/resources/fonts/lana-logos-v1.woff`
                        )}') format('woff');
                        font-weight: normal;
                        font-style: normal;
                        font-display: swap;
                    }
                `
                }}
            />
        </>
    );
};

FontFace.propTypes = {
    contextPath: PropTypes.string.isRequired,
    deployment: PropTypes.func.isRequired
};

export default FontFace;
