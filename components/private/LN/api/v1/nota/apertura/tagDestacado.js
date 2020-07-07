import get from 'lodash.get';

const tagDestacado = dataArticle => {
    const sponsored = get(dataArticle, 'owner.sponsored');

    if (!sponsored) return null;

    const resp = {
        formatoId: 1
    };

    const anunciante = get(dataArticle, 'label.marca_anunciante');

    if (anunciante && sponsored) {
        resp.tipoDescripcion = 'contentLab';
        resp.valor = anunciante.text;
    } else {
        resp.tipoDescripcion = 'Patrocinado';
        resp.valor = 'Espacio Patrocinado';
    }

    return resp;
};

export default tagDestacado;
