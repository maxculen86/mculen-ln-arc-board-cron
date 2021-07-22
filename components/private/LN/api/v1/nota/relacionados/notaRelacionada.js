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
        enviarApp: !matchObject(dataNota)
    };

    const volanta = get(dataNota, 'label.volanta');

    return volanta ? { ...resp, volanta: volanta.text } : resp;
};

export default notaRelacionada;
