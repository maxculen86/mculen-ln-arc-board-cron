import get from 'lodash.get';
import ImageCommon from '../common/image';

const imageNota = imageData => {
    const resp = ImageCommon(imageData);
    if (!resp) return null;

    if (imageData.credits && imageData.credits.by && imageData.credits.by.length > 0) {
        resp.credito = get(imageData, 'credits.by[0].name');
    }

    if (imageData.distributor) {
        resp.fuente = get(imageData, 'distributor.name');
    }

    if (imageData.caption) {
        resp.epigrafe = imageData.caption;
    }

    return resp;
};

imageNota.type = 'image';

export default imageNota;
