import { boxInfoComplete } from './boxes/boxInfoComplete';
import { boxInfoApertura } from './boxes/boxInfoApertura';
import { boxInfoAnticipo } from './boxes/boxInfoAnticipo';

export const boxInfoBySectionAliasLN = {
    'ln-common/cajaanticipo': boxInfoAnticipo,
    apertura: boxInfoApertura,
    default: boxInfoComplete
};

export default boxInfoBySectionAliasLN;
