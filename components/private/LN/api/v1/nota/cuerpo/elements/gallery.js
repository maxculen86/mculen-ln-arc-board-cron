import get from 'lodash.get';
import { dateAndTimeForAppsUtil } from '../../../../../../common/utils/dateAndTimeUtil';
import Image from '../../image';

const gallery = dataGallery => {
    if (!dataGallery) return null;

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

    if (!images || images.length === 0) return null;

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
