import { getTagId } from '../../../../../common/utils/getElementId';

const tag = dataTag => {
    if (!dataTag) return null;

    const resp = {
        id: getTagId(dataTag.slug),
        slug: dataTag.slug,
        valor: dataTag.text,
        tipoId: 1,
        formatoId: 1,
        tipoDescripcion: 'Topico'
    };

    return resp;
};

export default tag;
