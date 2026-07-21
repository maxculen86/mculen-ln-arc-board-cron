import get from './get';

const getAuthorByline = author =>
    get(author, 'additional_properties.original.byline') !== undefined
        ? get(author, 'additional_properties.original.byline')
        : get(author, 'name', '');

export default getAuthorByline;
