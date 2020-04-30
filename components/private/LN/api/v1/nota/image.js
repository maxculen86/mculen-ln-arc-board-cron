import get from 'lodash.get';
import ImageCommon from '../common/image';

const imageNota = imageData => {
    console.log('IMAGENNNNNNNNNNNNNNNNNNNNNNNNNN', imageData);
    const resp = ImageCommon(imageData);
    if (!resp) return null;
    // TODO: revisar con producto que campo de composer es FUENTE y cual CREDITO, tanto para
    // el dato en la imagen, como para el dato en la relacion
    const fuente = get(imageData, 'credits.affiliation[0].name');
    const credito = get(imageData, 'credits.by[0].name');
    const fuenteRelacion = get(imageData, 'vanity_credits.affiliation[0].name');
    const creditoRelacion = get(imageData, 'vanity_credits.by[0].name');
    console.log('Fuente imagen', fuente);
    console.log('credito imagen', credito);
    console.log('Fuente relacion imagen', fuenteRelacion);
    console.log('credito relacion imagen', creditoRelacion);

    resp._t = 'img';

    if (imageData.caption) {
        resp.epigrafe = imageData.caption;
    }

    return resp;
};

imageNota.type = 'image';

export default imageNota;
