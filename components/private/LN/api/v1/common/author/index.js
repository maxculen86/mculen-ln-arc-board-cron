import get from 'lodash.get';
import { getAutorId } from '../../../../../common/utils/getElementId';
import { getImageUrl } from '../image';

const getAuthorData = author => {
    const { _id: id, name } = author;

    if (!name) {
        throw new Error('Nombre de Autor Inexistente');
    }

    return {
        id: getAutorId(id),
        slug: id,
        valor: name
    };
};

const authorCommon = author => {
    const { type } = author;
    const authorData = getAuthorData(author);
    const image = getImageUrl(
        get(author, 'additional_properties.original.image', null)
    );

    return {
        ...authorData,
        tipo: authorData.slug ? 1 : 2,
        imagen: image ? image[0] : null
    };
};

export const authorAcu = author => {
    const authorData = getAuthorData(author);
    const { email, twitter } = author;
    const image = getImageUrl(get(author, 'image.url', null));

    return {
        ...authorData,
        imagen: image ? image[0] : null,
        mail: email,
        twitter: twitter ? twitter.trim() : twitter
    };
};

export const authorHomeMobile = author => {
    const authorData = getAuthorData(author);
    const { email, twitter } = author;
    const image = getImageUrl(
        get(author, 'image.resized_urls[0].resizedUrl', null)
    );
    const absoluteUrl =
        get(author, 'image.resized_urls[0].resizedUrl', null) ||
        get(author, 'image.url', null);

    return {
        ...authorData,
        tipo: authorData.slug ? 1 : 2,
        imagen: image ? image[0] : null,
        absoluteUrl,
        mail: email,
        twitter: twitter ? twitter.trim() : twitter
    };
};

export default authorCommon;
