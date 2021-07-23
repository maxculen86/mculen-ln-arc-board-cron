import Consumer from 'fusion:consumer';
import CabezalRevistaComponent from '../../private/LN/acumulado/cabezalRevista';

CabezalRevistaComponent.lazy = ['default', 'amp'];

export default Consumer(CabezalRevistaComponent);
