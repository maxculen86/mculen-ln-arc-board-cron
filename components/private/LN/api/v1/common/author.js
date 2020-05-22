import imageAcu from './image';
import { getAutorId } from '../../../../common/utils/getElementId';

const authorCommon = author => {
    const { _id: id, name, image, type } = author;

    const resp = {
        id: getAutorId(id),
        nombre: name,
        tipo: type === 'author' ? 1 : 2
    };

    if (image && image.url) {
        resp.image = imageAcu(image);
    }

    return resp;
};

export default authorCommon;
