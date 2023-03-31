import { boxInfoComplete } from './boxes/boxInfoComplete';
import { boxInfoHashTag } from './boxes/boxInfoHashTag';
import { boxInfoAFondo } from './boxes/boxInfoAFondo';
import { boxInfoApertura } from './boxes/boxInfoApertura';
import { boxInfoAnticipo } from './boxes/boxInfoAnticipo';
import { boxInfoExclusiveSuscriptor } from './boxes/boxInfoExclusiveSuscriptor';
import { boxInfoBomba } from './boxes/boxInfoBomba';
import { boxInfoOpinion } from './boxes/boxInfoOpinion';
import { boxInfoEditorial } from './boxes/boxInfoEditoriales';

export const boxInfoBySectionAliasLN10 = {
    'ln-common/ln10_anticipo': boxInfoAnticipo,
    apertura: boxInfoApertura,
    hashtag: boxInfoHashTag,
    'sub-exclusive': boxInfoExclusiveSuscriptor,
    afondo: boxInfoAFondo,
    bomba: boxInfoBomba,
    bombita: boxInfoBomba,
    'ln-common/ln10_opinion': boxInfoOpinion,
    'ln-common/ln10_editorial': boxInfoEditorial,
    default: boxInfoComplete
};

export default boxInfoBySectionAliasLN10;
