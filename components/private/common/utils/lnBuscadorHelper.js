export const createAndInsertElementsHtml = array => {
    array.forEach(({ element, whereToInsert, attributes, children = '' }) => {
        const createTag = document.createElement(element);
        createTag.innerHTML = children;
        document.querySelector(whereToInsert).appendChild(createTag);

        if (attributes) {
            attributes.forEach(({ attribute, value }) => {
                createTag.setAttribute(attribute, value);
            });
        }
    });
};

const createTagsTitleAndMetas = (description, url, searchResults) => {
    const constructTitle = `${searchResults}: Resultados de búsqueda para las últimas noticias en LA NACION`;
    const construcDescription = description.replace(/[+]/, searchResults);

    createAndInsertElementsHtml([
        {
            element: 'title',
            children: constructTitle,
            whereToInsert: 'head'
        },
        {
            element: 'meta',
            whereToInsert: 'head',
            attributes: [
                {
                    attribute: 'property',
                    value: 'og:title'
                },
                {
                    attribute: 'content',
                    value: constructTitle
                }
            ]
        },
        {
            element: 'meta',
            whereToInsert: 'head',
            attributes: [
                {
                    attribute: 'name',
                    value: 'title'
                },
                {
                    attribute: 'content',
                    value: constructTitle
                }
            ]
        },
        {
            element: 'meta',
            whereToInsert: 'head',
            attributes: [
                {
                    attribute: 'name',
                    value: 'description'
                },
                {
                    attribute: 'content',
                    value: construcDescription
                }
            ]
        },
        {
            element: 'meta',
            whereToInsert: 'head',
            attributes: [
                {
                    attribute: 'property',
                    value: 'og:description'
                },
                {
                    attribute: 'content',
                    value: construcDescription
                }
            ]
        },
        {
            element: 'meta',
            whereToInsert: 'head',
            attributes: [
                {
                    attribute: 'property',
                    value: 'og:url'
                },
                {
                    attribute: 'content',
                    value: url
                }
            ]
        }
    ]);
};

export default createTagsTitleAndMetas;
