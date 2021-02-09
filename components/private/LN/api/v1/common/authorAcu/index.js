import imageAcu from '../image';
import { getAutorId } from '../../../../../common/utils/getElementId';

const authorCommon = author => {
    const { _id: id, name, image, type, email, twitter } = author;

    const resp = {
        id: getAutorId(id),
        nombre: id,
        autorImagenId: null,
        hdImagenId: null,
        hdImagenExtension: null,
        mail: email,
        twitter: twitter
    };

    if (image && image.url) {
        resp.image = imageAcu(image);
    }

    return resp;
};

export default authorCommon;
