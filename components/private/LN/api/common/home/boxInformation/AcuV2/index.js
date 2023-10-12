import { boxInfoCompleteV2 } from './boxes/boxInfoCompleteV2';
import { boxInfoApertura } from '../LN//boxes/boxInfoApertura';
import { boxInfoAnticipo } from '../LN//boxes/boxInfoAnticipo';

export const boxInfoBySectionAcumuladoV2 = {
    'ln-common/cajaanticipo': boxInfoAnticipo,
    apertura: boxInfoApertura,
    'ln-acumulado/timeline': boxInfoApertura,
    default: boxInfoCompleteV2
};

export default boxInfoBySectionAcumuladoV2;
