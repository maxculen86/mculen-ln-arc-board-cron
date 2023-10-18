import { boxInfoComplete } from './boxes/boxInfoComplete';
import { boxInfoHashTag } from './boxes/boxInfoHashTag';
import { boxInfoAFondo } from '../LN10/boxes/boxInfoAFondo';
import { boxInfoApertura } from '../LN10/boxes/boxInfoApertura';
import { boxInfoAnticipo } from './boxes/boxInfoAnticipo';
import { boxInfoExclusiveSuscriptor } from '../LN10/boxes/boxInfoExclusiveSuscriptor';
import { boxInfoBomba } from '../LN10/boxes/boxInfoBomba';
import { boxInfoOpinion } from './boxes/boxInfoOpinion';
import { boxInfoEditorial } from './boxes/boxInfoEditoriales';

export const boxInfoBySectionAliasLN10v2 = {
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

export default boxInfoBySectionAliasLN10v2;
