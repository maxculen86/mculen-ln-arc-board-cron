import { getTagId } from '../../../../../common/utils/getElementId';

const tag = tag => {
    if (!tag) return null;

    const resp = {
        id: getTagId(tag.slug),
        slug: tag.slug,
        valor: tag.text,
        tipoId: 1,
        formatoId: 1,
        tipoDescripcion: 'Topico'
    };

    return resp;
};

export default tag;
