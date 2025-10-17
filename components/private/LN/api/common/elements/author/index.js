import get from '../../../../../common/utils/get';
import { getAutorId } from '../../../../../common/utils/getElementId';
import { getImageUrlBasedOnResizerVersion } from '../image';

const DISTRIBUTOR_LN = 'LA NACION';
const getAuthorData = author => {
    const { _id: id, name, expertise, role } = author;
    if (!name) {
        throw new Error('Nombre de Autor Inexistente');
    }

    const roleDesc =
        role || get(author, 'additional_properties.original.role', null);

    const voicePropertyValue = get(
        author,
        'additional_properties.original.voice',
        null
    );

    const parsedValue = Number(voicePropertyValue);
    const voice = !Number.isNaN(parsedValue) ? parsedValue : null;

    const authorData = {
        id: getAutorId(id),
        slug: id,
        valor: name,
        intereses: expertise,
        rol: roleDesc
    };

    return voice ? { ...authorData, voice } : authorData;
};

export const getAuthorBio = author => {
    const { longBio, location, education, languages, affiliations, books } =
        author;

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
    const url = get(author, 'additional_properties.original.image', null);
    const image = getImageUrlBasedOnResizerVersion(url);

    return {
        ...authorData,
        tipo: authorData.slug ? 1 : 2,
        imagen: image || null
    };
};

export const authorAcu = (author, page) => {
    const authorData = getAuthorData(author);
    const authorBio = getAuthorBio(author);
    const { email, twitter } = author;
    const image = getImageUrlBasedOnResizerVersion(
        get(author, 'image.url', null)
    );
    return {
        ...authorData,
        imagen: !image ? null : image,
        mail: email,
        twitter: twitter ? twitter.trim() : twitter,
        ...(page <= 1 ? authorBio : null)
    };
};

export const authorAcuFollow = authorFollow => {
    const author = authorFollow;
    delete author.type;
    return author;
};

export const authorHomeMobile = author => {
    const authorData = getAuthorData(author);
    const { email, twitter } = author;

    const image = getImageUrlBasedOnResizerVersion(
        get(author, 'image.resized_urls[0].resizedUrl', null)
    );
    const absoluteUrl =
        get(author, 'image.resized_urls[0].resizedUrl', null) ||
        get(author, 'image.url', null);

    return {
        ...authorData,
        tipo: authorData.slug ? 1 : 2,
        imagen: image,
        absoluteUrl,
        mail: email,
        twitter: twitter ? twitter.trim() : twitter
    };
};

export const articleSignature = (authors, signature = null) => {
    let authorsValue = [];

    if (!authors || signature) {
        return signature;
    }

    const lastAuthor = authors[authors.length - 1];
    authorsValue = `${authors.length > 0 ? 'Por' : ''} ${authors
        .map(author => {
            let resp = '';
            if (lastAuthor === author && authors.length !== 1) {
                if (author.valor[0].toUpperCase() === 'I') resp = ' e ';
                else resp = ' y ';
            } else if (author === authors[0]);
            else resp = ' ';

            return resp + author.valor;
        })
        .toString()
        ?.replace(/,(?=[^,][ey])/, '')}`;

    return authorsValue;
};

export const distributorOrAuthorSignature = (
    distributor,
    authors,
    signature = null
) => {
    const isGuestAuthor =
        authors && authors.length > 0 && authors[0].tipo === 2;

    if (!distributor || distributor.name === DISTRIBUTOR_LN || !isGuestAuthor) {
        return articleSignature(authors, signature);
    }
    return `Por ${distributor.name}`;
};
