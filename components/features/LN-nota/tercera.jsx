import Consumer from 'fusion:consumer';
import Tercera from '../../private/LN/nota/tercera';

Tercera.label = 'LN-nota-tercera';

Tercera.lazy = ['default', 'amp'];

export default Consumer(Tercera);
