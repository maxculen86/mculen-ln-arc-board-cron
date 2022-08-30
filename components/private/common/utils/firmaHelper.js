import get from './get';

export const place = Object.freeze({ Top: 'Top', Bottom: 'Bottom' });

export const filterByAuthor = authors =>
    authors.filter(author => author.type === 'author');

const renderAsList = (authors, position) =>
    (authors && authors.length > 1) || position === place.Bottom;

export const getPropsBuilderFromContentElements = position => contentElements =>
    position === place.Top
        ? { authors: [], photo: null, medio: null }
        : contentElements
              .filter(
                  contentElement =>
                      contentElement.additional_properties &&
                      contentElement.additional_properties.nodeType === 'firma'
              )
              .map(author => ({ name: author.content }))
              .reduce(
                  (accumulator, value) => ({
                      ...accumulator,
                      authors: [{ name: value.name }],
                      photo: null,
                      medio: null
                  }),
                  {}
              );

export const getPropsBuilder = position => authors =>
    authors
        .map(author => {
            const id = get(author, '_id');
            const name = get(author, 'name');

            return {
                name:
                    get(
                        author,
                        'additional_properties.original.author_type'
                    ) === ''
                        ? name
                        : get(
                              author,
                              'additional_properties.original.byline'
                          ) || name,
                link: id ? `/autor/${id}/` : '',
                photo: get(author, 'additional_properties.original.image'),
                medio: get(author, 'additional_properties.original.role')
            };
        })
        .reduce(
            (accumulator, value) => {
                return {
                    ...accumulator,
                    ...{
                        authors: [
                            ...accumulator.authors,
                            ...[
                                {
                                    ...{ name: value.name },
                                    ...{ link: value.link }
                                }
                            ]
                        ]
                    },
                    ...{
                        photo: renderAsList(authors, position)
                            ? null
                            : value.photo
                    },
                    ...{
                        medio: renderAsList(authors, position)
                            ? null
                            : value.medio
                    }
                };
            },
            { authors: [], photo: null, medio: null, smth: 'credits' }
        );
