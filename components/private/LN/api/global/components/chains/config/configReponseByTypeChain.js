import { respChildrens as respApertura } from '../common/respChildrens/chainsTypes/apertura';
import { respChildrens as respBomba } from '../common/respChildrens/chainsTypes/bomba';
import { respChildrens as respManualLN10 } from '../common/respChildrens/chainsTypes/temaLN10';
import { responseDefault } from '../common/respChildrens/chainsTypes/tema';

export const respChildrens = {
    apertura: respApertura,
    bomba: respBomba,
    chainManual: respManualLN10,
    LN: responseDefault,
    LN10: respManualLN10
};

export default respChildrens;
