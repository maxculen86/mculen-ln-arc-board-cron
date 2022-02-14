import get from 'lodash.get';

import ImageCommon from '../image';
import epigrafeAndCreditsData from '../../../../../common/utils/epigrafeAndCreditsData';

const imageNota = imageData => {
    const resp = ImageCommon(imageData);

    if (!resp) return null;

    const credits = epigrafeAndCreditsData(imageData);
    if (credits) resp.credito = credits;

    if (imageData.distributor && imageData.distributor.name) {
        resp.fuente = get(imageData, 'distributor.name', '');
    }

    if (imageData.caption) {
        resp.epigrafe = imageData.caption;
    }

    return resp;
};

imageNota.type = 'image';

export default imageNota;
