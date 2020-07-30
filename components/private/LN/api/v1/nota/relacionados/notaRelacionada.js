import get from 'lodash.get';

const notaRelacionada = dataNota => {
    if (!dataNota) return null;

    if (dataNota.type != 'reference') return null;

    const {
        _id: id,
        headlines: { basic: titulo },
        website_url: url
    } = dataNota;

    const resp = {
        id,
        titulo,
        url
    };

    const volanta = get(dataNota, 'label.volanta');
    if (volanta) {
        resp.volanta = volanta.text;
    }

    return resp;
};

export default notaRelacionada;
