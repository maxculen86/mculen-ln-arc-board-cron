/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';

import AdvertiserContent from './scriptManager/AdvertiserContent';
import scriptVideoValidator from './scriptManager/scriptVideoValidator';

export const _AMPBoilerplate =
    'body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}';

const styleConfig = {
    OTT: {},
    'la-nacion-ar': {
        'AMP-LN-Acu': 'resources/dist/css/ln/amp/ampln-acu.css',
        'AMP-LN-Acu-Noticias':
            'resources/dist/css/ln/amp/ampln-acu-noticias.css',
        'LN-nota-noticia': 'resources/dist/css/ln/amp/ampln-acu.css',
        'LN-nota-infografia': 'resources/dist/css/ln/amp/ampln-acu.css'
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

export const Snippets = () => {
    return React.createElement(AdvertiserContent);
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
        ],
        'LN-nota-noticia': [
            {
                customElement: 'amp-carousel',
                src: 'https://cdn.ampproject.org/v0/amp-carousel-0.1.js'
            },
            {
                customElement: 'amp-ad',
                src: 'https://cdn.ampproject.org/v0/amp-ad-0.1.js'
            },
            {
                customElement: 'amp-accordion',
                src: 'https://cdn.ampproject.org/v0/amp-accordion-0.1.js'
            },
            {
                customElement: 'amp-sidebar',
                src: 'https://cdn.ampproject.org/v0/amp-sidebar-0.1.js'
            },
            {
                customElement: 'amp-analytics',
                src: 'https://cdn.ampproject.org/v0/amp-analytics-0.1.js'
            },
            {
                customElement: 'amp-sticky-ad',
                src: 'https://cdn.ampproject.org/v0/amp-sticky-ad-1.0.js'
            },
            {
                customElement: 'amp-youtube',
                src: 'https://cdn.ampproject.org/v0/amp-youtube-0.1.js'
            },
            {
                customElement: 'amp-twitter',
                src: 'https://cdn.ampproject.org/v0/amp-twitter-0.1.js'
            },
            {
                customElement: 'amp-instagram',
                src: 'https://cdn.ampproject.org/v0/amp-instagram-0.1.js'
            },
            {
                customElement: 'amp-facebook',
                src: 'https://cdn.ampproject.org/v0/amp-facebook-0.1.js'
            },
            {
                customElement: 'amp-vimeo',
                src: 'https://cdn.ampproject.org/v0/amp-vimeo-0.1.js'
            },
            {
                customElement: 'amp-dailymotion',
                src: 'https://cdn.ampproject.org/v0/amp-dailymotion-0.1.js'
            },
            {
                customElement: 'amp-vine',
                src: 'https://cdn.ampproject.org/v0/amp-vine-0.1.js'
            },
            {
                customElement: 'amp-iframe',
                src: 'https://cdn.ampproject.org/v0/amp-iframe-0.1.js'
            },
            {
                customElement: 'amp-video',
                src: 'https://cdn.ampproject.org/v0/amp-video-0.1.js',
                validateInclusion: globalContent =>
                    scriptVideoValidator(globalContent)
            
        ],
        'LN-nota-infografia': [
            {
                customElement: 'amp-carousel',
                src: 'https://cdn.ampproject.org/v0/amp-carousel-0.1.js'
            },
            {
                customElement: 'amp-ad',
                src: 'https://cdn.ampproject.org/v0/amp-ad-0.1.js'
            },
            {
                customElement: 'amp-accordion',
                src: 'https://cdn.ampproject.org/v0/amp-accordion-0.1.js'
            },
            {
                customElement: 'amp-sidebar',
                src: 'https://cdn.ampproject.org/v0/amp-sidebar-0.1.js'
            },
            {
                customElement: 'amp-analytics',
                src: 'https://cdn.ampproject.org/v0/amp-analytics-0.1.js'
            },
            {
                customElement: 'amp-sticky-ad',
                src: 'https://cdn.ampproject.org/v0/amp-sticky-ad-1.0.js'
            },
            {
                customElement: 'amp-youtube',
                src: 'https://cdn.ampproject.org/v0/amp-youtube-0.1.js'
            },
            {
                customElement: 'amp-twitter',
                src: 'https://cdn.ampproject.org/v0/amp-twitter-0.1.js'
            },
            {
                customElement: 'amp-instagram',
                src: 'https://cdn.ampproject.org/v0/amp-instagram-0.1.js'
            },
            {
                customElement: 'amp-facebook',
                src: 'https://cdn.ampproject.org/v0/amp-facebook-0.1.js'
            },
            {
                customElement: 'amp-vimeo',
                src: 'https://cdn.ampproject.org/v0/amp-vimeo-0.1.js'
            },
            {
                customElement: 'amp-dailymotion',
                src: 'https://cdn.ampproject.org/v0/amp-dailymotion-0.1.js'
            },
            {
                customElement: 'amp-vine',
                src: 'https://cdn.ampproject.org/v0/amp-vine-0.1.js'
            },
            {
                customElement: 'amp-iframe',
                src: 'https://cdn.ampproject.org/v0/amp-iframe-0.1.js'
            }
        ]
    }
};

const AMPScripts = props => {
    const scriptsToLoad = [];
    const { arcSite, layout, contentFeatures, globalContent } = props;

    const sitio = config[arcSite];
    if (!sitio) return null;

    const ScriptsConfig = sitio[layout];

    ScriptsConfig &&
        ScriptsConfig.forEach(configElement => {
            const loadScript =
                evaluateIfCheckInclusion(configElement, contentFeatures) &&
                evaluateIfValidationRender(configElement, globalContent);

            loadScript &&
                scriptsToLoad.push(
                    <script
                        async
                        custom-element={configElement.customElement}
                        src={configElement.src}
                    />
                );
        });
    /*
        ScriptsConfig.forEach(
            ({ customElement, src, checkInclusion, validateInclusion }) => {
                const loadScript = checkInclusion
                    ? contentFeatures.find(e => e === checkInclusion)
                    : 1;

                loadScript &&
                    scriptsToLoad.push(
                        <script async custom-element={customElement} src={src} />
                    );
            }
        );
        */

    return scriptsToLoad;
};

AMPScripts.propTypes = {
    arcSite: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired
};

const evaluateIfCheckInclusion = (configElement, contentFeatures) => {
    return configElement.checkInclusion
        ? contentFeatures.find(e => e === config.checkInclusion)
        : true;
};

const evaluateIfValidationRender = (configElement, globalContent) => {
    return configElement.validateInclusion
        ? configElement.validateInclusion(globalContent)
        : true;
};

export default AMPScripts;
