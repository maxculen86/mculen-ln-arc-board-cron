/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import {
    embedElements,
    embedsForNote,
    styleConfig,
    evaluateFunctionInclusion,
    config
} from './utils/scripts/amp/helper';
import getOembedScripts from './scriptManager/getOembedScripts';
import { getStyleFontsInLine } from './fontface';
import { CriticalCSSString } from './criticalcss';

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

export const AMPCustomStyle = props => {
    const { arcSite, layout, Resource, contextPath, deployment } = props;
    const { [layout]: StylesConfig } = styleConfig[arcSite] || {};

    return StylesConfig ? (
        <Resource path={StylesConfig}>
            {({ data }) => {
                return data ? (
                    <style
                        amp-custom="amp-custom"
                        dangerouslySetInnerHTML={{
                            __html: `
                            ${CriticalCSSString}
                            ${getStyleFontsInLine({ contextPath, deployment })}
                            ${data.replace('@charset "UTF-8";', '')}`
                        }}
                    />
                ) : null;
            }}
        </Resource>
    ) : null;
};

const AMPScripts = props => {
    const scriptsToLoad = [];
    const { arcSite, layout, globalContent } = props;
    const { [layout]: ScriptsConfig = [] } = config[arcSite] || {};

    ScriptsConfig.concat(
        getOembedScripts(globalContent, embedElements, embedsForNote)
    ).forEach(configElement => {
        const loadScript =
            (evaluateFunctionInclusion(configElement, globalContent) &&
                configElement.hasBanners ===
                    globalContent.label.mostrar_banners.text) ||
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

AMPCustomStyle.propTypes = {
    arcSite: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired,
    Resource: PropTypes.func.isRequired
};

export default AMPScripts;
