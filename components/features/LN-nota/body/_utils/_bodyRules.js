import get from '../../../../private/common/utils/get';
import { matchesArcType, isFotoAl100, isVideoJw } from './helpers';

export const bodyRules = {
    custom_embed: ({ componentElement, subtypeElement }) =>
        componentElement.arcType === subtypeElement,
    quote: ({ componentElement, subtypeElement }) =>
        componentElement.arcType === subtypeElement,
    fotoAl100: ({ componentElement, type, subtypeElement }) => {
        const isSocialEmbed =
            type === 'oembed_response' &&
            [
                'twitter',
                'instagram',
                'tiktok',
                'facebook',
                'facebook-video',
                'facebook-post'
            ].includes(componentElement.subtype);
        return (
            componentElement.arcType &&
            (componentElement.arcType === subtypeElement ||
                matchesArcType(componentElement, type) ||
                isSocialEmbed)
        );
    },
    videoJw: ({ componentElement, subtypeElement }) =>
        componentElement.arcType === subtypeElement,
    default: ({ componentElement, type }) =>
        componentElement.arcType && matchesArcType(componentElement, type)
};

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

    const match = conditions.find(condition => condition.check());
    return match ? match.rule : get(bodyRules, `${type}`, bodyRules.default);
};

export const supportedTypes = ['text', 'image', 'oembed_response', 'video'];
