import { startsWithIorHiRAE } from '../../../../private/common/utils/getAuthorsAsString';

const trimText = value => (typeof value === 'string' ? value.trim() : '');

// Todo front: ajustar estilos para links de firma
const buildAuthorText = ({ name, link }) =>
    link ? `<a href="${link}">${name}</a>` : name;

const normalizeAuthors = (authors = []) =>
    authors.reduce((acc, author) => {
        const name = trimText(author?.name);
        if (!name) return acc;
        acc.push({
            name,
            link: trimText(author?.link)
        });
        return acc;
    }, []);

const getLastAuthorConnector = name =>
    startsWithIorHiRAE(name) ? ' e ' : ' y ';

export const getAuthorsListText = (authors = []) => {
    if (!Array.isArray(authors) || authors.length === 0) return '';

    const normalizedAuthors = normalizeAuthors(authors);

    if (normalizedAuthors.length === 0) return '';

    const authorsText = normalizedAuthors.map(buildAuthorText);
    if (authorsText.length === 1) return authorsText[0];

    const connector = getLastAuthorConnector(
        normalizedAuthors[normalizedAuthors.length - 1].name
    );

    return `${authorsText.slice(0, -1).join(', ')}${connector}${
        authorsText[normalizedAuthors.length - 1]
    }`;
};
