/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';

export const _AMPBoilerplate =
    'body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}';

const styleConfig = {
    OTT: {},
    'la-nacion-ar': {
        'AMP-LN-Acu': 'resources/dist/css/ln/amp/ampln-acu.css',
        'AMP-LN-Acu-Noticias':
            'resources/dist/css/ln/amp/ampln-acu-noticias.css'
    }
};

export const AMPCustomStyle = props => {
    const { arcSite, layout, Resource } = props;

    const sitio = styleConfig[arcSite];
    if (!sitio) return null;

    const StylesConfig = sitio[layout];

    return StylesConfig ? (
        <Resource path={StylesConfig}>
            {({ data }) => {
                return data ? (
                    <style
                        amp-custom="amp-custom"
                        dangerouslySetInnerHTML={{
                            __html: data.replace('@charset "UTF-8";', '')
                        }}
                    />
                ) : null;
            }}
        </Resource>
    ) : null;
};

AMPCustomStyle.propTypes = {
    arcSite: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired,
    Resource: PropTypes.func.isRequired
};

const config = {
    OTT: {},
    'la-nacion-ar': {
        'AMP-LN-Acu': [
            {
                customElement: 'amp-sidebar',
                src: 'https://cdn.ampproject.org/v0/amp-sidebar-0.1.js'
            },
            {
                customElement: 'amp-carousel',
                src: 'https://cdn.ampproject.org/v0/amp-carousel-0.1.js'
            },
            {
                customElement: 'amp-iframe',
                src: 'https://cdn.ampproject.org/v0/amp-iframe-0.1.js'
            },
            {
                customElement: 'amp-video',
                src: 'https://cdn.ampproject.org/v0/amp-video-0.1.js'
            },
            {
                customElement: 'amp-accordion',
                src: 'https://cdn.ampproject.org/v0/amp-accordion-0.1.js'
            },
            {
                customElement: 'amp-ad',
                src: 'https://cdn.ampproject.org/v0/amp-ad-0.1.js'
            } /*
            {
                checkInclusion: 'LN-home/AMPStory',
                customElement: 'amp-story',
                src: 'https://cdn.ampproject.org/v0/amp-story-1.0.js'
            } */
        ]
    }
};

const AMPScripts = props => {
    const scriptsToLoad = [];
    const { arcSite, layout, contentFeatures } = props;

    const sitio = config[arcSite];
    if (!sitio) return null;

    const ScriptsConfig = sitio[layout];

    ScriptsConfig &&
        ScriptsConfig.forEach(({ customElement, src, checkInclusion }) => {
            const loadScript = checkInclusion
                ? contentFeatures.find(e => e === checkInclusion)
                : 1;

            loadScript &&
                scriptsToLoad.push(
                    <script async custom-element={customElement} src={src} />
                );
        });

    return scriptsToLoad;
};

AMPScripts.propTypes = {
    arcSite: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired
};

export default AMPScripts;
