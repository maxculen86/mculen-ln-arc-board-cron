import { FOTOAL100 } from '../../../../private/common/utils/subtypes/subtypeHelper';

export const isFotoAl100 = (noteSubtype, subtypeElement) => {
    return noteSubtype === FOTOAL100 && subtypeElement !== 'custom-parallax';
};

export const isExcludedType = type => {
    return !['oembed_response', 'raw_html', 'video'].includes(type);
};

export const isVideoJw = (componentElement, subtypeElement) => {
    return (
        componentElement.arcType === subtypeElement &&
        componentElement.arcType === 'video_jw'
    );
};
