import Consumer from 'fusion:consumer';
import BajadaNota from '../../private/LN/nota/apertura/bajadaNota';

BajadaNota.static = true;
BajadaNota.label = 'LN-Nota-Bajada';

export default Consumer(BajadaNota);
