import getAuthorByline from '../../../common/utils/getAuthorByline';

export const decorator = (prefix, regex, replace, string) =>
    regex && replace && string
        ? `${prefix}${string
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(regex, replace)}`
        : '';

export const getCategories = sections =>
    sections && sections.length
        ? sections
              .map(section => decorator('ca_', /\W/g, '_', section.name))
              .join(',')
        : '';

export const getTags = tags =>
    tags && tags.length
        ? tags.map(tag => decorator('te_', /\W/g, '_', tag.text)).join(',')
        : '';

export const getAuthors = object =>
    object && object.length
        ? object
              .map(author => {
                  const name = getAuthorByline(author);
                  return decorator('au_', /\W/g, '_', name);
              })
              .join(',')
        : '';

export const getAuthorsFromContentElements = object => {
    const authors =
        object &&
        object.length &&
        object.filter(
            contentElement =>
                contentElement.additional_properties &&
                contentElement.additional_properties.nodeType === 'firma'
        );
    return authors && authors.length
        ? authors
              .map(author => decorator('au_', /\W/g, '_', author.content))
              .join(',')
        : '';
};

export const getCustParamsEncoded = (
    tags,
    sections,
    contentElements,
    id = '',
    authors = []
) => {
    const tagsFormated = getTags(tags);
    const categoriesFormated = getCategories(sections);
    const authorList = authors.length
        ? getAuthors(authors)
        : getAuthorsFromContentElements(contentElements);

    const dataConcat = tagsFormated
        .concat(',', categoriesFormated)
        .concat(',', authorList)
        .concat(',', id);

    const dataEncoded =
        dataConcat.charAt(0) === ',' ? dataConcat.substring(1) : dataConcat;

    return dataEncoded.replace(/,/g, '%2C');
};
