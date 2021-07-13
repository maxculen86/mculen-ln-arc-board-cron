/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';

//import AdvertiserContent from './scriptManager/AdvertiserContent';
import scriptVideoValidator from './scriptManager/scriptVideoValidator';

export const _AMPBoilerplate =
    'body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}';

const styleConfig = {
    OTT: {},
    'la-nacion-ar': {
        // 'LN-nota-noticia':'resources/dist/css/ln/amp/amp-basic.css',
        'LN-nota-foto-al-100': 'resources/dist/css/ln/amp/amp-foto100.css',
        'LN-nota-infografia': 'resources/dist/css/ln/amp/amp-infografia.css',
        'LN-nota-noticia': 'resources/dist/css/ln/amp/amp-noticia.css',
        'LN-nota-storytelling':
            'resources/dist/css/ln/amp/amp-storytelling.css',
        'LN-acumulado': 'resources/dist/css/ln/amp/amp-acumulado.css',
        'LN-nota-video': 'resources/dist/css/ln/amp/amp-video.css'
        // '':resources/dist/css/ln/amp/amp-receta.css
    }
};

const customElementForAcu = [
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
        customElement: 'amp-analytics',
        src: 'https://cdn.ampproject.org/v0/amp-analytics-0.1.js'
    },
    {
        customElement: 'amp-sticky-ad',
        src: 'https://cdn.ampproject.org/v0/amp-sticky-ad-1.0.js'
    },
    {
        customElement: 'amp-lightbox',
        src: 'https://cdn.ampproject.org/v0/amp-lightbox-0.1.js'
    },
    {
        customElement: 'amp-ad',
        src: 'https://cdn.ampproject.org/v0/amp-ad-0.1.js'
    }
    /*
            {
                checkInclusion: 'LN-home/AMPStory',
                customElement: 'amp-story',
                src: 'https://cdn.ampproject.org/v0/amp-story-1.0.js'
            } */
];

const customElementForNote = [
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
        customElement: 'amp-social-share',
        src: 'https://cdn.ampproject.org/v0/amp-social-share-0.1.js'
    },
    {
        customElement: 'amp-ima-video',
        src: 'https://cdn.ampproject.org/v0/amp-ima-video-0.1.js',
        validateInclusion: globalContent => scriptVideoValidator(globalContent)
    }
];

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

/* export const Snippets = () => {
    return React.createElement(AdvertiserContent);
}; */

const config = {
    OTT: {},
    'la-nacion-ar': {
        'AMP-LN-Acu': customElementForAcu,
        'LN-acumulado': customElementForAcu,
        'LN-nota-noticia': customElementForNote,
        'LN-nota-infografia': customElementForNote,
        'LN-nota-storytelling': customElementForNote,
        'LN-nota-foto-al-100': customElementForNote
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
                evaluateCheckInclusion(configElement, contentFeatures) &&
                evaluateFunctionInclusion(configElement, globalContent);

            loadScript &&
                scriptsToLoad.push(
                    <script
                        async
                        custom-element={configElement.customElement}
                        custom-template={configElement.customTemplate}
                        src={configElement.src}
                    />
                );
        });

    return scriptsToLoad;
};

AMPScripts.propTypes = {
    arcSite: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired
};

const evaluateCheckInclusion = (configElement, contentFeatures) => {
    return configElement.checkInclusion
        ? contentFeatures.find(e => e === configElement.checkInclusion)
        : true;
};

const evaluateFunctionInclusion = (configElement, globalContent) => {
    return configElement.validateInclusion
        ? configElement.validateInclusion(globalContent)
        : true;
};

export default AMPScripts;
