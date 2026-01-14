import Consumer from 'fusion:consumer';
import GetCajaCarrusel from '../../private/LN/api/global/components/chains/LN10/getCajaCarrusel';

class CajaCarruselHorizontal extends GetCajaCarrusel {
    constructor(props) {
        super(props, {
            allowedChildren: ['LN-10/itemCarruselHorizontal'],
            isHorizontal: true
        });
    }
}

export default Consumer(CajaCarruselHorizontal);
