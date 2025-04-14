import { respChildrens as respApertura } from '../common/respChildrens/chainsTypes/apertura';
import { respChildrens as respBomba } from '../common/respChildrens/chainsTypes/bomba';
import { respChildrens as respManualLN10 } from '../common/respChildrens/chainsTypes/temaLN10';
import { respChildrens as respVideoPlayer } from '../common/respChildrens/chainsTypes/videoPlayer';
import { responseDefault } from '../common/respChildrens/chainsTypes/tema';

export const respChildrens = {
    apertura: respApertura,
    bomba: respBomba,
    chainManual: respManualLN10,
    LN: responseDefault,
    LN10: respManualLN10,
    bnPlayer: respVideoPlayer
};

export default respChildrens;
