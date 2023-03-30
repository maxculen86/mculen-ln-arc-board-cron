import { boxInfoComplete } from './boxes/boxInfoComplete';
import { boxInfoHashTag } from './boxes/boxInfoHashTag';
import { boxInfoAFondo } from './boxes/boxInfoAFondo';
import { boxInfoApertura } from './boxes/boxInfoApertura';
import { boxInfoAnticipo } from './boxes/boxInfoAnticipo';
import { boxInfoExclusiveSuscriptor } from './boxes/boxInfoExclusiveSuscriptor';

export const boxInfoBySectionAliasLN10 = {
    'ln-common/ln10_anticipo': boxInfoAnticipo,
    apertura: boxInfoApertura,
    hashtag: boxInfoHashTag,
    'sub-exclusive': boxInfoExclusiveSuscriptor,
    afondo: boxInfoAFondo,
    default: boxInfoComplete
};

export default boxInfoBySectionAliasLN10;
