import imageAcu from '../image';
import { getAutorId } from '../../../../../common/utils/getElementId';

const authorAcu = author => {
    const { _id: id, name, image, email, twitter } = author;

    if (!id) {
        throw new Error('id de autor inexistente');
    }
    if (!name) {
        throw new Error('nombre de autor inexistente');
    }

    const resp = {
        id: getAutorId(id),
        nombre: name,
        imagen: image && image.url ? imageAcu(image) : null,
        mail: email,
        twitter
    };

    return resp;
};

export default authorAcu;
