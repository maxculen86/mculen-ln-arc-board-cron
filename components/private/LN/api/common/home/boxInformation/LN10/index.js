import { boxInfoBasic } from '../common/boxBasic';
import { boxInfoComplete } from './boxes/boxInfoComplete';
import { boxInfoAFondo } from './boxes/boxInfoAFondo';
import { boxInfoApertura } from './boxes/boxInfoApertura';
import { boxInfoAnticipo } from './boxes/boxInfoAnticipo';
import { boxInfoExclusiveSuscriptor } from './boxes/boxInfoExclusiveSuscriptor';

export const boxInfoBySectionAliasLN10 = {
    'ln-common/ln10_anticipo': boxInfoAnticipo,
    apertura: boxInfoApertura,
    hashtag: boxInfoBasic,
    'sub-exclusive': boxInfoExclusiveSuscriptor,
    afondo: boxInfoAFondo,
    default: boxInfoComplete
};

export default boxInfoBySectionAliasLN10;
