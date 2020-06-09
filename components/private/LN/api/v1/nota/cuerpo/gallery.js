import { dateAndTimeForAppsUtil } from '../../../../../common/utils/dateAndTimeUtil';
import Image from '../image';
import get from 'lodash.get';

const gallery = dataGallery => {
    const {
        _id: id,
        description: { basic: epigrafe },
        headlines: { basic: titulo }
    } = dataGallery;

    const resp = {
        _t: 'gal',
        id,
        epigrafe,
        titulo,
        fecha: dateAndTimeForAppsUtil(dataGallery.publish_date),
        imagenes: []
    };

    const images = get(dataGallery, 'content_elements');

    if (!images && images.length) return null;

    images.forEach(element => {
        resp.imagenes.push(Image(element));
    });

    return {
        _t: 'p',
        valor: resp
    };
};

gallery.type = 'gallery';

export default gallery;
