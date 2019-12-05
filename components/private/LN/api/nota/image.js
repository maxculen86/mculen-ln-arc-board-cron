import get from 'lodash.get';
import ImageCommon from '../common/image';

const imageNota = imageData => {
    const resp = ImageCommon(imageData);
    if (!resp) return null;
    // TODO: pendiente revision con ARC. Traer data de niveles profundos
    const fuente = get(imageData, 'credits.affiliation[0].name');
    const credito = get(imageData, 'credits.by[0].name');
    resp._t = 'img';

    if (imageData.caption) {
        resp.epigrafe = imageData.caption;
    }

    return resp;
};

imageNota.type = 'image';

export default imageNota;
