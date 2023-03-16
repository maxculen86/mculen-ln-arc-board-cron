import { boxInfoComplete } from './boxes/boxInfoComplete';
import { boxInfoApertura } from './boxes/boxInfoApertura';
import { boxInfoAnticipo } from './boxes/boxInfoAnticipo';

export const boxInfoBySectionAliasLN = {
    'ln-common/cajaanticipo': boxInfoAnticipo,
    apertura: boxInfoApertura,
    'ln-acumulado/timeline': boxInfoApertura,
    default: boxInfoComplete
};

export default boxInfoBySectionAliasLN;
