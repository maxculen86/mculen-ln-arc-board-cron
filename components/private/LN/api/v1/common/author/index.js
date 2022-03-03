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

export const getAuthorBio = author => {
    const {
        longBio,
        location,
        education,
        languages,
        affiliations,
        books
    } = author;

    return {
        longBio,
        location,
        education,
        languages,
        affiliations,
        books
    };
};

export const authorCommon = author => {
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

export const authorAcu = (author, page) => {
    const authorData = getAuthorData(author);
    const authorBio = getAuthorBio(author);
    const { email, twitter } = author;
    const image = getImageUrl(get(author, 'image.url', null));
    return {
        ...authorData,
        imagen: image ? image[0] : null,
        mail: email,
        twitter: twitter ? twitter.trim() : twitter,
        ...(page <= 1 ? authorBio : null)
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

export const articleSignature = (authors, signature = null) => {
    let authorsValue = [];
    if (authors && !signature) {
        const lastAuthor = authors[authors.length - 1];
        authorsValue = `${authors.length > 0 ? 'Por' : ''} ${authors
            .map(author => {
                let resp = '';
                if (lastAuthor == author && authors.length !== 1) {
                    if (author.valor[0].toUpperCase() == 'I') resp = ' e ';
                    else resp = ' y ';
                } else if (author == authors[0]) resp = '';
                else resp = ' ';

                return resp + author.valor;
            })
            .toString()
            .replace(/\,(?=[^,][ey])/, '')}`;
    }
    return signature || authorsValue;
};
