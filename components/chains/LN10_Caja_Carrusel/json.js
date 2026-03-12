import Consumer from 'fusion:consumer';
import GetCajaCarrusel from '../../private/LN/api/global/components/chains/LN10/getCajaCarrusel';

class CajaCarrusel extends GetCajaCarrusel {
    constructor(props) {
        super(props, {
            allowedChildren: ['LN-10/itemCarrusel', 'LN-common/bannerRefactor'],
            isHorizontal: false
        });
    }
}

export default Consumer(CajaCarrusel);
