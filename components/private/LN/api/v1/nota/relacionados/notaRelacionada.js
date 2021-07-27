import get from 'lodash.get';
import matchObject from '../../common/utils/matchObject';

const notaRelacionada = dataNota => {
    if (!dataNota) return null;

    const {
        _id: id,
        headlines: { basic: titulo },
        website_url: websiteUrl,
        canonical_url: canonicalUrl
    } = dataNota;

    const resp = {
        id,
        titulo,
        url: websiteUrl || canonicalUrl,
        // TODO: pendiente revisar validacion para match
        enviarApps: matchObject(dataNota, 'regex')
    };

    const volanta = get(dataNota, 'label.volanta');

    return volanta ? { ...resp, volanta: volanta.text } : resp;
};

export default notaRelacionada;
