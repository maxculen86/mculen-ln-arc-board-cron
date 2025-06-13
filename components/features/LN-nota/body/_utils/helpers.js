import { FOTOAL100 } from '../../../../private/common/utils/subtypes/subtypeHelper';

export const isFotoAl100 = (noteSubtype, subtypeElement) =>
    noteSubtype === FOTOAL100 && subtypeElement !== 'custom-parallax';

export const isVideoJw = (componentElement, subtypeElement) =>
    componentElement.arcType === subtypeElement &&
    componentElement.arcType === 'video_jw';

export const matchesArcType = (componentElement, type) =>
    componentElement.arcType === type;
