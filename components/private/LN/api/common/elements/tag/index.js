import get from '../../../../../common/utils/get';
import { getTagId } from '../../../../../common/utils/getElementId';

const getTag = dataTag => {
    if (!dataTag) return null;

    return {
        id: getTagId(dataTag.slug),
        slug: dataTag.slug,
        valor: dataTag.text,
        tipoId: 1,
        formatoId: 1,
        tipoDescripcion: 'Topico'
    };
};

const getFeaturedTag = dataArticle => {
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

export { getTag, getFeaturedTag };
