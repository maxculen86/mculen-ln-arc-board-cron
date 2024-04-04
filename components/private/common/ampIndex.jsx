/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import {
    embedElements,
    embedsForNote,
    evaluateFunctionInclusion,
    config
} from './utils/scripts/amp/helper';
import getOembedScripts from './scriptManager/getOembedScripts';
import get from './utils/get';

export const _AMPBoilerplate = `
    body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    }
    @-webkit-keyframes -amp-start {
        from {
        visibility: hidden;
        }
        to {
        visibility: visible;
        }
    }
    @-moz-keyframes -amp-start {
        from {
        visibility: hidden;
        }
        to {
        visibility: visible;
        }
    }
    @-ms-keyframes -amp-start {
        from {
        visibility: hidden;
        }
        to {
        visibility: visible;
        }
    }
    @-o-keyframes -amp-start {
        from {
        visibility: hidden;
        }
        to {
        visibility: visible;
        }
    }
    @keyframes -amp-start {
        from {
        visibility: hidden;
        }
        to {
        visibility: visible;
        }
    }`;

const AMPScripts = props => {
    const scriptsToLoad = [];
    const { arcSite, layout, globalContent } = props;
    const { [layout]: ScriptsConfig = [] } = config[arcSite] || {};
    const mostrarBanners = get(
        globalContent,
        'label.mostrar_banners.text',
        'Si'
    );
    ScriptsConfig.concat(
        getOembedScripts(globalContent, embedElements, embedsForNote)
    ).forEach(configElement => {
        const loadScript =
            (evaluateFunctionInclusion(configElement, globalContent) &&
                configElement.hasBanners === mostrarBanners) ||
            configElement.hasBanners === undefined;
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

export default AMPScripts;
