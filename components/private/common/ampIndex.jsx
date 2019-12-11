import React from 'react';
import PropTypes from 'fusion:prop-types';

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
