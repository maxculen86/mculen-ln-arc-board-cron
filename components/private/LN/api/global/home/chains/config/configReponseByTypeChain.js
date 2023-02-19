import { respChildrens as respApertura } from '../respChildrens/chainsTypes/apertura';
import { respChildrens as respBomba } from '../respChildrens/chainsTypes/bomba';
import { respChildrens as respManualLN10 } from '../respChildrens/chainsTypes/temaLN10';
import { responseDefault } from '../respChildrens/chainsTypes/tema';

export const respChildrens = {
    apertura: respApertura,
    bomba: respBomba,
    chainManual: respManualLN10,
    default: responseDefault
};

export default respChildrens;
