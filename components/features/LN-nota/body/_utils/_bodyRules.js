import get from '../../../../private/common/utils/get';
import { isExcludedType, isFotoAl100, isVideoJw } from './helpers';

export const selectRule = ({
    subtype,
    type,
    subtypeElement,
    componentElement
}) => {
    const conditions = [
        {
            check: () => isFotoAl100(subtype, subtypeElement),
            rule: bodyRules.fotoAl100
        },
        {
            check: () => isVideoJw(componentElement, subtypeElement),
            rule: bodyRules.videoJw
        }
    ];

    for (const condition of conditions) {
        if (condition.check()) {
            return condition.rule;
        }
    }
    return get(bodyRules, `${type}`, bodyRules.default);
};

export const bodyRules = {
    custom_embed: ({ componentElement, subtypeElement }) => {
        return componentElement.arcType === subtypeElement;
    },
    quote: ({ componentElement, subtypeElement }) => {
        return componentElement.arcType === subtypeElement;
    },
    fotoAl100: ({ componentElement, type }) => {
        return (
            isExcludedType(type) &&
            bodyRules.default({ componentElement, type })
        );
    },
    videoJw: ({ componentElement, subtypeElement }) => {
        return componentElement.arcType === subtypeElement;
    },
    default: ({ componentElement, type }) => {
        return componentElement.arcType === type;
    }
};

export const supportedTypes = ['text', 'image', 'oembed_response', 'video'];
