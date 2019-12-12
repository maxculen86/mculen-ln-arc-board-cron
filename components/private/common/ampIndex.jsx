import React from 'react';
import PropTypes from 'fusion:prop-types';

export const _AMPBoilerplate =
    'body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}';

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
            }
        ]
    }
};

const ampIndex = props => {
    const scriptsToLoad = [];
    const { arcSite, layout } = props;

    const sitio = config[arcSite];
    if (!sitio) return null;

    const ScriptsConfig = sitio[layout];

    ScriptsConfig &&
        ScriptsConfig.forEach(({ customElement, src }) => {
            scriptsToLoad.push(
                <script async custom-element={customElement} src={src} />
            );
        });

    return scriptsToLoad;
};

ampIndex.propTypes = {
    arcSite: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired
};

export default ampIndex;
