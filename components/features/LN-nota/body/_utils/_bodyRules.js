import { FOTOAL100 } from '../../../../private/common/utils/subtypes/subtypeHelper';
import get from '../../../../private/common/utils/get';

export const selectRule = ({ globalSubtype, typeElement, outputType }) => {
    if (globalSubtype === FOTOAL100) {
        return bodyRules.defaultFotoAl100;
    }
    return get(
        bodyRules,
        `${typeElement}.${outputType}`,
        bodyRules.defaultRule
    );
};

export const supportedTypes = ['text', 'image', 'oembed_response', 'video'];

export const bodyRules = {
    text: {},
    image: {},
    video: {},
    pullquote: {},
    oembed_response: {
        amp: ({ componentElement }) => {
            return (
                componentElement.arcType === 'oembed_response' &&
                componentElement.outputType === 'amp'
            );
        },
        default: ({ componentElement }) => {
            return (
                componentElement.arcType === 'oembed_response' &&
                componentElement.outputType === 'default'
            );
        }
    },
    blockquote: {},
    header: {},
    gallery: {},
    list: {},
    interstitial_link: {},
    powerupreceta: {},
    raw_html: {
        amp: ({ content = '', componentElement }) => {
            const isAmp = componentElement.outputType === 'amp';
            if (content.includes('iframe')) {
                return componentElement.arcType === 'raw_html' && isAmp;
            }

            if (content.includes('opta-widget')) {
                return (
                    componentElement.arcType === 'raw_html' &&
                    componentElement.outputType === 'opta'
                );
            }
            return componentElement.arcType === 'raw_html' && isAmp;
        },
        default: ({ componentElement }) => {
            return (
                componentElement.arcType === 'raw_html' &&
                componentElement.outputType === 'default'
            );
        }
    },
    custom_embed: {
        amp: ({ componentElement, subtypeElement }) => {
            return componentElement.arcType === subtypeElement;
        },
        default: ({ componentElement, subtypeElement }) => {
            return componentElement.arcType === subtypeElement;
        }
    },
    quote: {
        amp: ({ componentElement, subtypeElement }) => {
            return componentElement.arcType === subtypeElement;
        },
        default: ({ componentElement, subtypeElement }) => {
            return componentElement.arcType === subtypeElement;
        }
    },
    defaultFotoAl100: ({ componentElement, typeElement }) => {
        return (
            !(
                typeElement === 'oembed_response' ||
                typeElement === 'raw_html' ||
                typeElement === 'video'
            ) && bodyRules.defaultRule({ componentElement, typeElement })
        );
    },
    defaultRule: ({ componentElement, typeElement }) => {
        return componentElement.arcType === typeElement;
    }
};
